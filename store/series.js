const state = () => ({
  items: [],
  fetched: false,
});

const mutations = {
  setItems (state, items) {
    state.items = items;
  },
  setFetched (state, value) {
    state.fetched = value;
  }
};

const actions = {
  async fetchItems ({ commit, state }) {
    if (!state.fetched) {
      const items = await Promise.resolve(require('~/data/series.json'));

      commit('setItems', items);
      commit('setFetched', true);
    }
  }
};

export default {
  state,
  mutations,
  actions,
};
