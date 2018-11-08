<template>
<!-- 1-->
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
        <li
        is="DragCompent"
        v-for="(item, index) in layoutItem2"
        :item="item"
        v-model="cloneLeftItemText"
        :key="index"></li>
        <div style="clear:both"></div>
      </ul>
    </div>
    <div class="middleCtn">
      <div class="head-title">表单标题</div>
      <div class="ctn" @mouseenter = "middleOnmouseEnter($event)" @mouseleave = "middleOnmouseOut($event)">
        <Single :class="{'field-active': index == dragCtnIndex}"
        v-for="(item, index) in layoutContentItem" 
        @dragCompentClick='dragCompentClick(index)'
        :key="index"
        :item='item'
        :index='index'/>
      </div>
    </div>
    <div class="rigthCtn">
      sasaaaa
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import DragCompent from '@/components/dragList/dragCompent'
import Single from '@/components/dragItem/single'

export default {
  name: 'App',
  data () {
    return {
      cloneLeftItemText: 'aa',
      dragCtnIndex: '999999',
      layoutItem: [{text: '一行两列', icon: 1}, {text: '一行三列', icon: 2}, {text: '表格', icon: 3}, {text: '明细子表', icon: 4}, {text: '分割线', icon: 5}],
      layoutItem2: [{text: '日期', icon: 1}, {text: '时间', icon: 2}, {text: '规则', icon: 3}],
      // layoutContentItem: [{text: '1111', upActive: false, downActive: false}, {text: '2222', upActive: false, downActive: false}, {text: '3333', upActive: false, downActive: false}, {text: '44444', upActive: false, downActive: false}, {text: '55555', upActive: false, downActive: false}],
      // 右边的组件是否被拖动了
      leftDragItemIsDraged: false,
      // 右边的组件是否在容器内移动
      leftDragItemIsMoving: false,

    }
  },
  methods: {
    middleOnmouseEnter: function (event) {
      // if (this.leftDragItemIsDraged) {
      //   this.leftDragItemIsMoving = true
      // }
    },
    middleOnmouseOut: function (event) {
    },
    dragCompentClick: function(index) {
      // console.log(index)
      this.dragCtnIndex = index
      // console.log(this.dragCtnIndex)
    },
    // ...mapActions(['updateLayoutContentItem'])
    ...mapActions(['updatePositionY']),
    emitUpdatePositionY: function (index) {
      this.updatePositionY(index)
    },
  },
  computed: {
    ...mapState({ 
      layoutContentItem: state => state.dragItemDate.layoutContentItem
    }),
  },
  components: {
    Single,
    DragCompent
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
  //   list1: {
  //     handler: function (newVal, oldVal) {
  //       console.log('bbbbbb')
  //     },
  //     deep: true
  //   }
  // },
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
      height: 800px;
    }
  }
  .rigthCtn{
    width: 300px;
    border: 1px solid black;
  }
}
</style>
