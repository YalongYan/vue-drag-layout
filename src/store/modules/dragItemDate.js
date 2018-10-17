// import types from '../mutation-types';
const LAYOUT_CONTENT_ITEM = 'LAYOUT_CONTENT_ITEM';
const UPDATE_POSITION_Y = 'UPDATE_POSITION_Y';
const state = {
  layoutContentItem: [{text: '1111', upActive: false, downActive: false}, {text: '2222', upActive: false, downActive: false}, {text: '3333', upActive: false, downActive: false}, {text: '44444', upActive: false, downActive: false}, {text: '55555', upActive: false, downActive: false}],
  positionY: 999
};

const actions = {
  // setUserInfo({ commit }, userInfo) {
  //   commit(types.SET_USER_INFO, userInfo);
  // }
  // item = {index:1, position: 1} position 1 是上 2 是下
  updateLayoutContentItem({ commit }, item) {
    var layoutContentItemLength = state.layoutContentItem.length - 1
    if (item.index > layoutContentItemLength) {
      position.index = layoutContentItemLength
    }
    commit(LAYOUT_CONTENT_ITEM, item);
  },
  updatePositionY({ commit }, position) {
    var layoutContentItemLength = state.layoutContentItem.length - 1
    if (position > layoutContentItemLength) {
      position = layoutContentItemLength
    }
    commit(UPDATE_POSITION_Y, position);
  }
};

const getters = {
  // loginStatus: state => state.loginStatus,
  layoutContentItem: state => state.layoutContentItem,
  positionY: state => state.positionY,
};

const mutations = {
  // [types.SET_USER_INFO](state, userInfo) {
  //   state.userInfo = userInfo;
  // }
  [LAYOUT_CONTENT_ITEM](state, item) {
    var index = item.index
    var data = state.layoutContentItem
    // 清空初始化
    for (var i = 0; i < data.length; i++) {
      data[i].downActive = false
      data[i].upActive = false
    }
    // console.log(item.position)
    if (item.position === 1 ) {
      data[index].upActive = true
      data[index].downActive = false
    } else {
      data[index].downActive = true
      data[index].upActive = false
    }
    console.log(data[index])
  },
  [UPDATE_POSITION_Y](state, position) {
    state.positionY = position
  }
};

export default {
  state,
  actions,
  getters,
  mutations,
};
