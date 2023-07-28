export default function ({ store, redirect }) {
    console.log(
      "!store.getters['auth/authentication']",
      !store.getters['auth/authentication']
    )
    if (!store.getters['auth/authentication']) {
      return redirect('/login')
    }
  }
  