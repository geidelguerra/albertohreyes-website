const state = () => ({
  showMenu: false,
  navHeight: 64,
  contact: {
    email: 'albertohreyes1976@gmail.com'
  }
})

const mutations = {
  setShowMenu (state, value) {
    state.showMenu = value;
  }
}

export default {
  state,
  mutations,
}
