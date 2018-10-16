// import types from '../mutation-types';
const LAYOUT_CONTENT_ITEM = 'LAYOUT_CONTENT_ITEM';
const state = {
  layoutContentItem: [{text: '1111', upActive: false, downActive: false}, {text: '2222', upActive: false, downActive: false}, {text: '3333', upActive: false, downActive: false}, {text: '44444', upActive: false, downActive: false}, {text: '55555', upActive: false, downActive: false}],
};

const actions = {
  // setUserInfo({ commit }, userInfo) {
  //   commit(types.SET_USER_INFO, userInfo);
  // }
  updateLayoutContentItem({ commit }, item) {
    commit(LAYOUT_CONTENT_ITEM, item);
  }
};

const getters = {
  // loginStatus: state => state.loginStatus,
  layoutContentItem: state => state.layoutContentItem,
};

const mutations = {
  // [types.SET_USER_INFO](state, userInfo) {
  //   state.userInfo = userInfo;
  // }
  [LAYOUT_CONTENT_ITEM](state, item) {
    // state.userInfo = userInfo;
    console.log(state.layoutContentItem)
    console.log(item)
  }
};

export default {
  state,
  actions,
  getters,
  mutations,
};
