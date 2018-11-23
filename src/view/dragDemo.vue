<template>
  <div id="container">
    <div class="leftCtn">
      <h3>表单布局</h3>
      <!-- 这是要克隆的 -->
      <!-- <div > -->
        <li class="mainCtn compents-li pointEventNone" id='cloneLeftCtnItem' style="display: none;position: fixed;z-index:99">
          <div>{{cloneLeftItemText}}</div>
        </li>
      <!-- </div> -->
      <ul class="components-ul">
        <li
        is="DragCompent"
        v-for="(item, index) in layoutItem"
        :item="item"
        v-model="cloneLeftItemText"
        :key="index"></li>
        <!-- <div class="cloneCtn"></div> -->
        <div style="clear:both"></div>
      </ul>
      <br/>
      <br/>
      <h3>常用控件 demo</h3>
      <ul class="components-ul">
        <div v-for="(item, index) in layoutItem2" :key="index">
          <li
            is="DragCompent"
            :item="item"
            v-model="cloneLeftItemText"
          ></li>
        </div>
        <div style="clear:both"></div>
      </ul>
    </div>
    <div class="middleCtn">
      <div class="head-title">表单标题</div>
      <div class="ctn">
        <div id="minHeightCtn">
          <div class=""
          v-for="(item, index) in layoutContentItem" 
          :key="index">
            <div v-if="item.componentKey === 'ColumnPanel' && item.size === '2'">
              <TwoColumns
                :class="{'field-active': item.active}"
                @dragCompentClick='dragCompentClick(index)'
                :item='item'
                :index='index'/>
            </div>
            <div v-else>
              <Single :class="{'field-active': item.active}"
                @dragCompentClick='dragCompentClick(index)'
                :item='item'
                :index='index'/>
                 <!-- {{item}} -->
            </div>
          </div>
          <div id='emptyHoverCtn' v-if="vuexEmptyHoverCtn"></div>
      </div>
    </div>
    </div>
    <div class="rigthCtn">
      <!-- <ShowDetails/> -->
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import DragCompent from '@/components/dragList/dragCompent'
import Single from '@/components/dragItem/single'
import TwoColumns from '@/components/dragItem/TwoColumns'
import ShowDetails from '@/components/dragItem/showDetails'

export default {
  name: 'App',
  data () {
    return {
      cloneLeftItemText: 'aa',
      dragCtnIndex: '999999',
      layoutItem: [{title: '一行两列', icon: 1}, {title: '一行三列', icon: 2}, {title: '表格', icon: 3}, {title: '明细子表', icon: 4}, {title: '分割线', icon: 5}],
      layoutItem2: [{title: '日期', icon: 1}, {title: '时间', icon: 2}, {title: '规则', icon: 3}],
      // layoutContentItem: [{text: '1111', upActive: false, downActive: false}, {text: '2222', upActive: false, downActive: false}, {text: '3333', upActive: false, downActive: false}, {text: '44444', upActive: false, downActive: false}, {text: '55555', upActive: false, downActive: false}],
      // 右边的组件是否被拖动了
      leftDragItemIsDraged: false,
      // 右边的组件是否在容器内移动
      leftDragItemIsMoving: false,
    }
  },
  methods: {
    ...mapActions(['updatePositionY', 'changeActiveStatue']),
    middleOnmouseOut: function (event) {
    },
    dragCompentClick: function(index) {
      this.emitChangeActiveStatue(index)
    },
    emitChangeActiveStatue: function (index) {
      this.changeActiveStatue(index)
    },
  },
  computed: {
    ...mapState({ 
      layoutContentItem: state => state.dragItemDate.layoutContentItem,
      vuexPositionY: state => state.dragItemDate.positionY,
      vuexEmptyHoverCtn: state => state.dragItemDate.emptyHoverCtn
    }),

  },
  components: {
    Single,
    DragCompent,
    TwoColumns,
    ShowDetails
  },
  mounted() {
    // console.log(this.updateLayoutContentItem({index: 1, position: 1}))
    // this.$store.commit('updateLayoutContentItem');
    // console.log(this.vuexLayoutContentItem)
    // var _this = this
    // setTimeout(function() {
    //   _this.layoutContentItem[0].downActive = false
    //   _this.layoutContentItem[1].upActive = true
    // },1000)
  }
  // watch: {
  //   vuexPositionY: {
  //     handler: function (newVal, oldVal) {
  //       console.log('newVal    ' + newVal)
  //     }
  //   }
  // }
}
</script>

<style lang='scss'>
ul, li{
  list-style: none;
}
* {
  margin: 0;
  padding: 0;
}
.pointEventNone{
  pointer-events: none;
  /* position: fixed; */
}

#container {
  display: flex;

  .leftCtn {
    box-sizing: border-box;
    width: 250px;
    border: 1px solid red;

    .components-ul{
      .compents-li{
        text-align: left;
        height: 40px;
        line-height: 40px;
        float: left;
        border: 1px dashed #78D3FF;
        color: #666;
        // min-width: 160px;
        margin-top: 10px;
        margin-right: 10px;
        cursor: move;
        background-color: #fff;
        // position: relative;
        padding: 0 5px;
      }
    }
  }
  .middleCtn{
    flex: 1;

    .head-title{
      text-align: center;
      border: 1px solid gray;
      line-height: 30px;
      height: 30px;
      box-sizing: border-box;
    }
    .ctn{
      border: 1px solid black;
      min-height: 800px;

      #minHeightCtn{
        // position: relative;
        padding-bottom: 90px;
        // border-bottom: 1px solid black;
        #emptyHoverCtn{
          width: 100%;
          height: 90px;
          border: 1px dashed red;
          display: none
        }
      }
    }
  }
  .rigthCtn{
    padding: 10px;
    width: 300px;
    border: 1px solid black;
  }
}
</style>
