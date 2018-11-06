// import { stat } from "fs";
//   ss  import types from '../mutation-types';
const LAYOUT_CONTENT_ITEM = 'LAYOUT_CONTENT_ITEM';
const UPDATE_POSITION_Y = 'UPDATE_POSITION_Y';
const UPDATE_ITEM_IS_MOVING = 'UPDATE_ITEM_IS_MOVING';
const CHANGE_LAYOUT_CONTENT_ITEM = 'CHANGE_LAYOUT_CONTENT_ITEM';
const UPDATE_LEFT_DRAG_ITEM_ISMOVING = 'UPDATE_LEFT_DRAG_ITEM_ISMOVING';
const state = {
  layoutContentItem: [{text: '1111', upActive: false, downActive: false}, {text: '2222', upActive: false, downActive: false}, {text: '3333', upActive: false, downActive: false}, {text: '44444', upActive: false, downActive: false}, {text: '55555', upActive: false, downActive: false}],
  positionY: 999,
  itemIsMoving: false, // 中间布局的item 是否被拖动
  leftDragItemIsMoving: false // 左侧的item是否被拖动
};

const actions = {
  // setUserInfo({ commit }, userInfo) {
  //   commit(types.SET_USER_INFO, userInfo);
  // }
  // item = {index:1, position: 1} position 1 是上 2 是下
  updateLayoutContentItem({ commit }, item) {
    console.log(item)
    console.log('- - - - - - -- - - - - - -')
    if (item) {
      var layoutContentItemLength = state.layoutContentItem.length - 1
      if (item.index > layoutContentItemLength) {
        item.index = layoutContentItemLength
      }
      commit(LAYOUT_CONTENT_ITEM, item);
    }
  },
  changeLayoutContentItem({ commit }) {
    commit(CHANGE_LAYOUT_CONTENT_ITEM);
  },
  updatePositionY({ commit }, position) {
    var layoutContentItemLength = state.layoutContentItem.length - 1
    if (position > layoutContentItemLength) {
      position = layoutContentItemLength
    }
    commit(UPDATE_POSITION_Y, position);
  },
  updateItemIsMoving({ commit }, bool) {
    commit(UPDATE_ITEM_IS_MOVING, bool);
  },
  updateLeftDragItemIsMoving({commit}, bool) {
    commit(UPDATE_LEFT_DRAG_ITEM_ISMOVING, bool);
  }
};

const getters = {
  // loginStatus: state => state.loginStatus,
  layoutContentItem: state => state.layoutContentItem,
  positionY: state => state.positionY,
  itemIsMoving: state => state.itemIsMoving,
  leftDragItemIsMoving: state => state.leftDragItemIsMoving,
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
    // console.log(data[index])
  },
  [UPDATE_POSITION_Y](state, position) {
    state.positionY = position
  },
  [UPDATE_ITEM_IS_MOVING](state, bool) {
    state.itemIsMoving = bool
  },
  [CHANGE_LAYOUT_CONTENT_ITEM](state) {
    // console.log(state)
    // state.layoutContentItem = [ {text: '1111', upActive: false, downActive: false},{text: '2222', upActive: false, downActive: false}, {text: '3333', upActive: false, downActive: false}, {text: '555555', upActive: false, downActive: false}, {text: '44444', upActive: false, downActive: false}]
    // state.itemIsMoving = bool
  },
  [UPDATE_LEFT_DRAG_ITEM_ISMOVING](bool) {
    state.leftDragItemIsMoving = bool
  }
};

export default {
  state,
  actions,
  getters,
  mutations,
};
