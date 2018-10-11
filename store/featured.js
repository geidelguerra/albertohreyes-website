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
      const items = await Promise.resolve(require('~/data/featured.json'));

      commit('setItems', items);
      commit('setFetched', true);
    }
  }
};

const getters = {
  items (state, getters, rootState) {
    const items = state.items.map(item => {
      const articles = item.articles.map(articleId => {
        return rootState.articles.items.find(article => article.id === articleId);
      });

      return Object.assign({}, item, { articles });
    });

    return items;
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
};
