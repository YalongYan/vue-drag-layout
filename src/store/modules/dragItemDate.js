import { stat } from "fs";

const state = {
  // 只用了原数据的数组  对象里增加了 'upActive': false 'downActive': false 是用来控制红色边框的出现
  layoutContentItem: [{
		"componentKey": "Text",
		"title": "文本000",
		"fieldId": "20181108195717mCmp5TOBfA",
		"inLeft": false,
		"required": false,
		"crux": false,
		"isTextArea": false,
		"size": "large",
		"borderColor": "",
		"bacColor": "",
		"titleFontColor": "",
		"titleFontSize": 13,
		"titleBold": false,
		"titleUnderline": false,
		"bacImg": null,
		"tips": "",
		"hideTitle": false,
		"uniqueCheck": false,
		"visible": false,
		"calculate": false,
		"calType": "2",
		"complexCal": "",
		"complexTrueVal": "",
		"numberFields": "",
		"numberFieldArr": [],
    "columncode": "wb_1541678285948866",
    'upActive': false,
    'downActive': false
  },
  {
		"componentKey": "Text",
		"title": "文本222",
		"fieldId": "20181109101800TWTeNtI5xk",
		"inLeft": false,
		"required": false,
		"crux": false,
		"isTextArea": false,
		"size": "large",
		"borderColor": "",
		"bacColor": "",
		"titleFontColor": "",
		"titleFontSize": 13,
		"titleBold": false,
		"titleUnderline": false,
		"bacImg": null,
		"tips": "",
		"hideTitle": false,
		"uniqueCheck": false,
		"visible": false,
		"calculate": false,
		"calType": "2",
		"complexCal": "",
		"complexTrueVal": "",
		"numberFields": "",
		"numberFieldArr": [],
    "columncode": "wb222_1541729905916187",
    'upActive': false,
    'downActive': false
	},
  {
		"componentKey": "Text",
		"title": "文本3333",
		"fieldId": "20181109101800TWTeNtI5xk",
		"inLeft": false,
		"required": false,
		"crux": false,
		"isTextArea": false,
		"size": "large",
		"borderColor": "",
		"bacColor": "",
		"titleFontColor": "",
		"titleFontSize": 13,
		"titleBold": false,
		"titleUnderline": false,
		"bacImg": null,
		"tips": "",
		"hideTitle": false,
		"uniqueCheck": false,
		"visible": false,
		"calculate": false,
		"calType": "2",
		"complexCal": "",
		"complexTrueVal": "",
		"numberFields": "",
		"numberFieldArr": [],
    "columncode": "wb222_1541729905916187",
    'upActive': false,
    'downActive': false
	},
	 {
		"fieldId": "20181108201139GBJRyIJAt2",
		"componentKey": "ColumnPanel",
		"title": "一行两列",
		"size": "2",
		"available": true,
		"bacColor": "",
		"borderWidth": 1,
		"layoutDetail": [{
			"componentKey": "ColumnPanel",
			"layoutDetail": [],
			"size": "1"
		}, {
			"componentKey": "ColumnPanel",
			"layoutDetail": [{
				"componentKey": "Text",
				"title": "文本111",
				"fieldId": "20181108201815UbNRaXUIfB",
				"inLeft": false,
				"required": false,
				"crux": false,
				"isTextArea": false,
				"size": "large",
				"borderColor": "",
				"bacColor": "",
				"titleFontColor": "",
				"titleFontSize": 13,
				"titleBold": false,
				"titleUnderline": false,
				"bacImg": null,
				"tips": "",
				"hideTitle": false,
				"uniqueCheck": false,
				"visible": false,
				"calculate": false,
				"calType": "2",
				"complexCal": "",
				"complexTrueVal": "",
				"numberFields": "",
				"numberFieldArr": [],
				"columncode": "wb_1541679666395165"
			}],
			"size": "1"
		}]
	}, 
	 {
		"fieldId": "20181109101802zMgVW3gcEU",
		"componentKey": "ColumnPanel",
		"title": "一行两列",
		"size": "2",
		"available": true,
		"bacColor": "",
		"borderWidth": 1,
		"layoutDetail": [{
			"componentKey": "ColumnPanel",
			"layoutDetail": [{
				"componentKey": "Password",
				"title": "密码",
				"fieldId": "20181109101809alDirc1F1m",
				"inLeft": false,
				"required": false,
				"crux": false,
				"isTextArea": false,
				"size": "large",
				"borderColor": "",
				"bacColor": "",
				"titleFontColor": "",
				"titleFontSize": 13,
				"titleBold": false,
				"titleUnderline": false,
				"bacImg": null,
				"tips": "",
				"hideTitle": false,
				"uniqueCheck": false,
				"visible": false,
				"calculate": false,
				"calType": "2",
				"complexCal": "",
				"complexTrueVal": "",
				"numberFields": "",
				"numberFieldArr": [],
				"columncode": "mm_1541729905915453"
			}],
			"size": "1"
		}, {
			"componentKey": "ColumnPanel",
			"layoutDetail": [{
				"componentKey": "Text",
				"title": "2112",
				"fieldId": "20181109101802omluIDs3TQ",
				"inLeft": false,
				"required": false,
				"crux": false,
				"isTextArea": false,
				"size": "large",
				"borderColor": "",
				"bacColor": "",
				"titleFontColor": "",
				"titleFontSize": 13,
				"titleBold": false,
				"titleUnderline": false,
				"bacImg": null,
				"tips": "",
				"hideTitle": false,
				"uniqueCheck": false,
				"visible": false,
				"calculate": false,
				"calType": "2",
				"complexCal": "",
				"complexTrueVal": "",
				"numberFields": "",
				"numberFieldArr": [],
				"columncode": "n2112_1541729905915431"
			}],
			"size": "1"
		}]
	}],
  // layoutContentItem: [{text: '1111', upActive: false, downActive: false}, {text: '2222', upActive: false, downActive: false}, {text: '3333', upActive: false, downActive: false}, {text: '44444', upActive: false, downActive: false}, {text: '55555', upActive: false, downActive: false}],
  // layoutContentItem: [{text: '1111', upActive: false, downActive: false}],
  initPositionY: 999, // 中部 开始拖动组件的 index
  positionY: 999, // 进入到哪个组件的 index
  itemIsMoving: false, // 中间布局的item 是否被拖动
  leftDragItemIsMoving: false, // 左侧的item是否被拖动
  centerDraggingItemData: '', // 保存中间拖动的组件的数据
  leftDraggingItemData: '', // 保存左侧拖动的组件的数据 
  isNeedUpdateDate: false // 是否需要更新数据
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
  changeLayoutContentItem({ commit }) {
    commit('CHANGE_LAYOUT_CONTENT_ITEM');
  },
  updatePositionY({ commit }, position) {
    // var layoutContentItemLength = state.layoutContentItem.length - 1
    // if (position > layoutContentItemLength) {
    //   position = layoutContentItemLength
    // }
    commit('UPDATE_POSITION_Y', position);
  },
  updateInitPositionY({ commit }, position) {
    commit('UPDATE_INIT_POSITION_Y', position);
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
  },
  // 是否需要触发更新数据
  updateIsNeedUpdateDate({commit}, bool) {
    commit('UPDATE_IS_NEED_UPDATE_DATA', bool);
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
      if (data[i].downActive) {
        data[i].downActive = false
      }
      if (data[i].upActive) {
        data[i].upActive = false
      }
    }
    // console.log(item.position)
    if (item.position === 1 ) {
      data[index].upActive = true
      data[index].downActive = false
    } else {
      data[index].downActive = true
      data[index].upActive = false
    }
    state.layoutContentItem = data
    // console.log(data)
  },
  ['UPDATE_POSITION_Y'](state, position) {
    state.positionY = position
  },
  ['UPDATE_INIT_POSITION_Y'](state, position) {
    state.initPositionY = position
  },
  ['UPDATE_ITEM_IS_MOVING'](state, bool) {
    state.itemIsMoving = bool
  },
  ['CHANGE_LAYOUT_CONTENT_ITEM'](state) {
    // 拖动中间的组件
    if (state.centerDraggingItemData) {
      var isNeedUpdateDateIndex = ''
      for (var i = 0; i < state.layoutContentItem.length; i++) {
        if (state.layoutContentItem[i].upActive || state.layoutContentItem[i].downActive) {
          isNeedUpdateDateIndex = i
        }
      }
      // 这是拖动 临界的位置 在临界位置
      if (isNeedUpdateDateIndex == state.initPositionY) {
        state.isNeedUpdateDate = false
      }
      // 可以触发更新
      if (state.isNeedUpdateDate) {
        var data1 = state.layoutContentItem
        data1.splice(state.initPositionY, 1)
        state.layoutContentItem = data1
        var data2 = state.layoutContentItem
        for (let i = 0; i < data2.length; i++) {
          let upActive = data2[i].upActive
          let downActive = data2[i].downActive
          if (upActive) {
            state.centerDraggingItemData.upActive = false
            state.centerDraggingItemData.downActive = false
            data2.splice(i, 0, state.centerDraggingItemData)
            break
          }
          if (downActive) {
            state.centerDraggingItemData.upActive = false
            state.centerDraggingItemData.downActive = false
            data2.splice(i + 1, 0, state.centerDraggingItemData)
            break
          }
        }
        state.layoutContentItem = data2
      }
      var data3 = state.layoutContentItem
      for (let i = 0; i < data3.length; i ++) {
          data3[i].downActive = false
          data3[i].upActive = false
      }
      state.layoutContentItem = data3
    }
    // 拖动左侧的组件
    if (state.leftDraggingItemData) {
      var title = state.leftDraggingItemData.title
      var obj = {}
      obj['title'] = title
      obj['upActive'] = false
      obj['downActive'] = false
      var data = state.layoutContentItem
      for (let i = 0; i < data.length; i++) {
        let upActive = data[i].upActive
        let downActive = data[i].downActive
        if (upActive) {
          data.splice(i, 0, obj)
          break
        }
        if (downActive) {
          data.splice(i + 1, 0, obj)
          break
        }
      }
      for (let i = 0; i < data.length; i ++) {
        data[i].downActive = false
        data[i].upActive = false
      }
      state.layoutContentItem = data
    }
  },
  ['UPDATE_LEFT_DRAG_ITEM_ISMOVING'](state, bool) {
    state.leftDragItemIsMoving = bool
  },
  ['UPDATE_CENTER_DRAGGING_ITEM_DATA'](state, item) {
    state.centerDraggingItemData = item
  },
  ['UPDATE_LEFT_DRAGGING_ITEM_DATA'](state, item) {
    state.leftDraggingItemData = item
    // console.log(state.leftDraggingItemData)
  },
  ['UPDATE_IS_NEED_UPDATE_DATA'](state, bool) {
    state.isNeedUpdateDate = bool
  }
};

export default {
  state,
  actions,
  getters,
  mutations,
};
