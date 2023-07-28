export default function ({ $axios, redirect, store }) {
  $axios.onRequest((config) => {
    console.log('ACCESSTOKEN', store.state.auth.accessToken)
    if (store.state.auth.accessToken) {
      config.headers['Authorization'] = `Bearer ${store.state.auth.accessToken}`
    }
  })

  $axios.onResponseError(async (error) => {
    try {
      console.log('errre', error.response)
      if (
        error.response.data.message === 'REFRESH_TOKEN_EXPIRED' ||
        error.response.data.message === 'INVALID_REFRESH_TOKEN'
      ) {
        throw new Error('LOGOUT')
      }
      if (
        error.response.status === 401 &&
        error.response.data.message === 'ACCESS_TOKEN_EXPIRED'
      ) {
        let refreshToken = store.state.auth.refreshToken
        const response = await $axios.$post(
          'http://localhost:7000/refresh-token',
          {
            refreshToken: refreshToken,
          }
        )
        if (!response) {
          throw new Error('LOGOUT')
        }

        // menyimpan token baru ke store/auth
        store.commit('auth/setAccessToken', response.accessToken)
        store.commit('auth/setRefreshToken', response.refreshToken)

        let originalRequest = error.config
        originalRequest.headers[
          'Authorization'
        ] = `Bearer ${response.accessToken}`
        return $axios(originalRequest)
      } else {
        return Promise.reject(error)
      }
    } catch (err) {
      if (err.message === 'LOGOUT') {
        return redirect('/logout')
      }
    }
  })
}
