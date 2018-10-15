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
  async fetchItems ({ commit, state, rootState }) {
    if (!state.fetched) {
      const items = await Promise.resolve(require(`~/data/${rootState.locale}/exhibits.json`));

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
