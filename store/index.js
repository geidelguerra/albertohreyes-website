const state = () => ({
  locales: ['es', 'en'],
  locale: 'es',
  showMenu: false,
  navHeight: 64,
  contact: {
    email: 'albertohreyes1976@gmail.com'
  }
})

const mutations = {
  setLocale (state, value) {
    if (state.locales.indexOf(value) !== -1) {
      state.locale = value;
    }
  },
  setShowMenu (state, value) {
    state.showMenu = value;
  }
}

export default {
  state,
  mutations,
}
