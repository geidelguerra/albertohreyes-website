import exhibits from '~/data/exhibits.json';
import featured from '~/data/featured.json';
import publications from '~/data/publications.json';
import series from '~/data/series.json';

const state = () => ({
  exhibits,
  featured,
  publications,
  series,
  showMenu: false,
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
