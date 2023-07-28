export const state = () => ({
    accessToken: null,
    refreshToken: null,
    email: null,
  })
  
  export const getters = {
    authentication(state) {
      if (state.accessToken) {
        return true
      }
      return false
    },
  }
  
  export const mutations = {
    setEmail: (state, email) => {
      state.fullname = email
    },
    setAccessToken: (state, accessToken) => {
      state.accessToken = accessToken
    },
    setRefreshToken: (state, refreshToken) => {
      state.refreshToken = refreshToken
    },
    logout: (state) => {
      state.email = null
      state.refreshToken = null
      state.accessToken = null
    },
  }
  
  export const actions = {
    async login({ commit }, payload) {
      const response = await this.$axios.post(
        'http://localhost:8000/login',
        payload
      )
      if (!response) {
        return false
      }
      commit('setAccessToken', response.data.accessToken)
      commit('setRefreshToken', response.data.refreshToken)
      commit('setEmail', response.data.email)
      return response
    },
  }
  