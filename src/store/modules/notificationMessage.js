const state = {
  message: null,
};

const actions = {
  setMessage({ commit }, response) {
    commit("MESSAGE_RECEIVED", response);
  },

  resetMessage({ commit }) {
    commit("MESSAGE_RECEIVED", null);
  },
};

const mutations = {
  MESSAGE_RECEIVED: (state, response) => {
    state.message = response;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
