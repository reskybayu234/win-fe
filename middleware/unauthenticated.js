export default function ({ store, redirect }) {
    if (store.getters['auth/authentication']) {
      return redirect('/')
    }
  }
  