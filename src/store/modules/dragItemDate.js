const state = {
  layoutContentItem: [{text: '1111', upActive: false, downActive: false}, {text: '2222', upActive: false, downActive: false}, {text: '3333', upActive: false, downActive: false}, {text: '44444', upActive: false, downActive: false}, {text: '55555', upActive: false, downActive: false}],
  positionY: 999,
  itemIsMoving: false, // 中间布局的item 是否被拖动
  leftDragItemIsMoving: false, // 左侧的item是否被拖动
  centerDraggingItemData: {}, // 保存中间拖动的组件的数据
  leftDraggingItemData: {} // 保存左侧拖动的组件的数据 
};

const actions = {
  // item = {index:1, position: 1} position 1 是上 2 是下
  updateLayoutContentItem({ commit }, item) {
    if (item) {
      var layoutContentItemLength = state.layoutContentItem.length - 1
      if (item.index > layoutContentItemLength) {
        item.index = layoutContentItemLength
      }
      commit('LAYOUT_CONTENT_ITEM', item);
    }
  },
  changeLayoutContentItem({ commit },newState) {
    commit('CHANGE_LAYOUT_CONTENT_ITEM', newState);
  },
  updatePositionY({ commit }, position) {
    var layoutContentItemLength = state.layoutContentItem.length - 1
    if (position > layoutContentItemLength) {
      position = layoutContentItemLength
    }
    commit('UPDATE_POSITION_Y', position);
  },
  updateItemIsMoving({ commit }, bool) {
    commit('UPDATE_ITEM_IS_MOVING', bool);
  },
  updateLeftDragItemIsMoving({commit}, bool) {
    commit('UPDATE_LEFT_DRAG_ITEM_ISMOVING', bool);
  },
  // 中间拖动的组件的数据
  updateCenterDraggingItemData({commit}, item) {
    commit('UPDATE_CENTER_DRAGGING_ITEM_DATA', item);
  },
  // 左边拖动的组件的数据
  updateLeftDraggingItemData({commit}, item) {
    commit('UPDATE_LEFT_DRAGGING_ITEM_DATA', item);
  }
};

const getters = {
  // loginStatus: state => state.loginStatus,
  layoutContentItem: state => state.layoutContentItem,
  positionY: state => state.positionY,
  itemIsMoving: state => state.itemIsMoving,
  leftDragItemIsMoving: state => state.leftDragItemIsMoving,
  centerDraggingItemData: state => state.centerDraggingItemData,
  leftDraggingItemData: state => state.leftDraggingItemData
};

const mutations = {
  // [types.SET_USER_INFO](state, userInfo) {
  //   state.userInfo = userInfo;
  // }
  ['LAYOUT_CONTENT_ITEM'](state, item) {
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
  ['UPDATE_POSITION_Y'](state, position) {
    state.positionY = position
  },
  ['UPDATE_ITEM_IS_MOVING'](state, bool) {
    state.itemIsMoving = bool
  },
  ['CHANGE_LAYOUT_CONTENT_ITEM'](state,newState) {
    console.log(state.centerDraggingItemData)
    var data = state.layoutContentItem
    for (let i = 0; i < data.length; i++) {
      // console.log(data[i])
      let upActive = data[i].upActive
      let downActive = data[i].downActive
      if (upActive) {
      // bug 到这里了
      }
      if (downActive) {

      }
    }
    // state.layoutContentItem = [ {text: '1111', upActive: false, downActive: false},{text: '2222', upActive: false, downActive: false}, {text: '3333', upActive: false, downActive: false}, {text: '555555', upActive: false, downActive: false}, {text: '44444', upActive: false, downActive: false}]
    // state.layoutContentItem = newState
  },
  ['UPDATE_LEFT_DRAG_ITEM_ISMOVING'](state, bool) {
    state.leftDragItemIsMoving = bool
  },
  ['UPDATE_CENTER_DRAGGING_ITEM_DATA'](state, item) {
    state.centerDraggingItemData = item
  },
  ['UPDATE_LEFT_DRAGGING_ITEM_DATA'](state, item) {
    state.leftDraggingItemData = item
  }
};

export default {
  state,
  actions,
  getters,
  mutations,
};
