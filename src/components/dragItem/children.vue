<template>
  <!-- pointEventNone 是为了去掉该组件本身的鼠标事件 -->
  <!-- 从父组件继承的subItem  是个数组 如果数组[0]  有数据（不是undefine） 就是有内容, 计算属性获取数组[0] 的对象 item  -->
<div style="height: 100%" 
  @mouseleave = "middleOnmouseLeave($event)">
  <!-- 如果item有数据 就是有组件 -->
  <div
    class="form-view"
    :class="{pointEventNone: ismoving}"
    v-if="item"
    @click='dragCompentClick()'
    @mousedown="mousedown($event, item)">
    <div class="innerCtn">
      <div class="field field_js">
        <span class="widgetDele-btn">
          <i class="iconfont icon-plus icon-copy-margin j_widgetCopy">+</i>
          <i class="iconfont icon-cancel02 j_widgetDele">x</i>
        </span>
        <div class="widget-title">
          <span class="widget-title_js" style="color:;font-size:13;">{{item.title}}</span>
          <i class="iconfont icon-pencil j_edit-title edit-title">B</i>
        </div>
        <div class="widget-content">  
          <input type="text" class="form-control large" readonly="">
        </div>
      </div>
    </div>
  </div>
  <!-- 这是空的 拖动的时候 鼠标移入就显示红色边框 移出就隐藏 -->
  <div v-else
    class="emptyCtn"
    :class="{dragInterClass: isEnter}"
    @mouseenter = "middleOnmouseEnter($event)"></div>
  <div v-if="isEnter" class="dragInterClass"></div>  
</div>
<!-- <div class="form-view"
  @click='dragCompentClick()'
  @mousedown="mousedown($event, item)">
    <div class="prefabricatedCtn prefabricatedUp" v-if="item.upActive"></div>
    <div class="innerCtn"
      :class="{pointEventNone: ismoving}"
      @mouseenter = "middleOnmouseEnter($event)"
      @mouseleave = "middleOnmouseLeave($event)">
      <div class="field field_js">
        <span class="widgetDele-btn">
          <i class="iconfont icon-plus icon-copy-margin j_widgetCopy">+</i>
          <i class="iconfont icon-cancel02 j_widgetDele">x</i>
        </span>
        <div class="widget-title">
          <span class="widget-title_js" style="color:;font-size:13;">{{item.title}}</span>
          <i class="iconfont icon-pencil j_edit-title edit-title">B</i>
        </div>
        <div class="widget-content">  
          <input type="text" class="form-control large" readonly="">
        </div>
      </div>
    </div>
    <div class="prefabricatedCtn prefabricatedDown" v-if="item.downActive"></div>
</div> -->
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Children',
  // prop: ['item', 'index'],
  props: {
    subItem: {
      type: Array,
      default: () => ([])
    },
    indexX: {
      type: Number,
      default: 0
    },
    indexY: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      isEnter: false,
      ismoving: false, //是否在mousedown状态下移动
      isout: false,    //鼠标是否out
      isover: false,   //是否mouseover
      start_y: 0,      //开始的位置, 这里只判断往上 往下移动 所以只跟 y 坐标比较
      init_node: ''    //初始的节点 
    }
  },
  computed: {
    ...mapState({
      vuexPositionY: state => state.dragItemDate.positionY,
      vuexItemIsMoving: state => state.dragItemDate.itemIsMoving,
      vuexLeftDragItemIsMoving: state => state.dragItemDate.leftDragItemIsMoving,
      vuexLayoutContentItem: state => state.dragItemDate.layoutContentItem
    }),
    item: function () {
      // 是undefine 也返回 上面会判断
      return this.subItem[0]
    }
  },
  methods: {
    /*
    ** 移动的思路是 ：
       第一个移动的组件 触发emitLayoutContentItem index 是自身的index 出现红框
       移入其他single组件的时候 比较 positionY 跟index 可以判断是从上 还是从下面移动过来的 显示上面或者下面的红框 
       positionY初始  mouseup 都是 999
       移动的最高 最低 位置边界 在single.vue dragConmpent.vue 每个组件的 move 里面
    */
  //   ...mapActions(['updatePositionY']),
    emitLayoutContentItem: function (item) {
      // var item = {index: 1, position: 1}
      this.updateLayoutContentItem(item)
    },
    // emitChangeLayoutContentItem: function (newState) {
    //   this.changeLayoutContentItem(newState)
    // },
    ...mapActions(['updateLayoutContentItem', 'updatePositionY', 'updateItemIsMoving', 'changeLayoutContentItem', 'updateCenterDraggingItemData', 'updateCenterDraggingItemData', 'updateInitPositionY', 'updateIsNeedUpdateDate']),
   emitUpdatePositionY: function (index) {
     this.updatePositionY(index)
   },
   emitUpdateItemIsMoving: function (bool) {
     this.updateItemIsMoving(bool)
   },
   emitUpdateInitPositionY: function (position) {
     this.updateInitPositionY(position)
   },
   // 保存中间正在拖动的组件数据
   emitUpdateCenterDraggingItemData: function (item) {
     this.updateCenterDraggingItemData(item)
   },
   // 是否需要触发更新数据
   emitUpdateIsNeedUpdateDate: function (bool) {
     this.updateIsNeedUpdateDate(bool)
   },
   middleOnmouseEnter: function (event) {
     console.log('enter')
    //  console.log(this.vuexLeftDragItemIsMoving)
    // 中间的组件拖动进入
    if (this.vuexItemIsMoving) {
      var vuexPositionY = this.vuexPositionY
      var _index = this.index
      var item = {index: _index, position: ''}
      if (_index > vuexPositionY) {
        item.position = 1
      } else {
        item.position = 2
      }
      this.emitLayoutContentItem(item)
      this.emitUpdatePositionY(this.index)
      this.emitUpdateIsNeedUpdateDate(true)
    }else if (this.vuexLeftDragItemIsMoving) {
      // 左侧组件拖动进入
       if (this.vuexPositionY !== 999) {
        var vuexPositionY = this.vuexPositionY
        var _index = this.index
        var item = {index: _index, position: ''}
        if (_index > vuexPositionY) {
          item.position = 1
        } else {
          item.position = 2
        }
        // console.log(item)
        // console.log('-----------------')
        this.emitLayoutContentItem(item)
      } else {
        var middleHeaderHeight = 30
        var middleItemHeight = 90
        var middleVertalHeigth = this.index * middleItemHeight + middleHeaderHeight + middleItemHeight/2
        // console.log(middleVertalHeigth)
        var _index = this.index
        var item = {index: _index, position: ''}
        if (event.y < middleVertalHeigth) {
          item.position = 1
        } else {
          item.position = 2
        }
        this.emitLayoutContentItem(item)
      }
    }
   },
   middleOnmouseLeave: function (event) {
    //  console.log('leave')
     this.isEnter = false
   },
    mousedown: function (event, site) {
      var _this = this
      var _site = site
      var event=event||window.event;
      var _target = event.currentTarget
      var childeNode = this.$el.childNodes[0]

      var startx=event.x;
      var starty=event.y;
      var _offsetLeft = childeNode.offsetLeft
      var _offsetTop = childeNode.offsetTop
      // sb_bkx sb_bky 是鼠标距离div边缘的距离
      var sb_bkx=startx-_offsetLeft;
      var sb_bky=starty-_offsetTop;
      var ww=document.documentElement.clientWidth;
      var wh = window.innerHeight;
      var targetWidth = this.$el.clientWidth
      var targetHeight = this.$el.clientHeight
      this.ismoving = true
      this.emitUpdateItemIsMoving(true)

      if (event.preventDefault) {
        event.preventDefault();
        event.stopPropagation();
      } else{
        event.returnValue=false;
      };
        // var scrolltop=document.documentElement.scrol
        document.onmousemove=function (ev) {
          if (_this.ismoving) {
            _this.isEnter = true
            _this.emitUpdateCenterDraggingItemData(_this.item)
            _this.emitUpdateInitPositionY(_this.index)
            _this.emitUpdatePositionY(_this.index)
            var item = {index: _this.index, position: 1}
            var event=ev||window.event;
            if (event.clientY < 0 || event.clientX < 0 || event.clientY > wh || event.clientX > ww) {
              return false;
            };
            // 这是父节点
            var endx=event.clientX-sb_bkx;
            var endy=event.clientY-sb_bky;

            childeNode.style.left=endx+'px';
            childeNode.style.top=endy+'px';
            childeNode.style.width=targetWidth+'px';
            childeNode.style.height=targetHeight+'px';
            childeNode.style.position='absolute'
            childeNode.style.zIndex=2
            childeNode.style.background='white'

            var vuexPositionY = _this.vuexPositionY
            // vuexPositionY 初始值 和mouseUp之后 都是 999   999代表刚开始拖动
            if (vuexPositionY === 999) {
              var _index = _this.index
              var item = {index: _index, position: 1}
              _this.emitLayoutContentItem(item)
            }
            // start中间组件拖动的上下边界判断
            var middleHeaderHeight = 30
            var middleItemHeight = 90
            var layoutContentItemLength = _this.vuexLayoutContentItem.length
            var maxHeight = layoutContentItemLength * middleItemHeight
            var minHeigth = middleHeaderHeight
            var itemStoreM = {index: '', position: ''}
            if (ev.y > maxHeight) {
              itemStoreM.index = layoutContentItemLength - 1
              itemStoreM.position = 2
              _this.emitLayoutContentItem(itemStoreM)
            } else if (ev.y < minHeigth) {
              itemStoreM.index = 0
              itemStoreM.position = 1
              _this.emitLayoutContentItem(itemStoreM)
            }
            // end中间组件拖动的上下边界判断
          }
        }
        document.onmouseup=function (ev) {
          _this.ismoving =false
          _this.emitUpdatePositionY(999)
          // console.log(_this.vuexPositionY)
          _this.changeLayoutContentItem()
          _this.emitUpdateIsNeedUpdateDate(false)
          _this.emitUpdateItemIsMoving(false)
          _this.emitUpdateCenterDraggingItemData('')
          document.onmouseup=null;
          _target.style.border=''
          
          // 置空后来加上去的样式
          childeNode.style.position=''
          // childeNode.style.left=''
          // childeNode.style.top='';
          // childeNode.style.width='';
          // childeNode.style.height='';
          // childeNode.style.position=''
          // childeNode.style.zIndex=0
          // childeNode.style.background=''
         
        }
    },
    dragCompentClick: function() {
      this.$emit('dragCompentClick')
    }
    
  },
  mounted (){
    // console.log(this.item)
  }
  // watch:{
  //   leftDragItemIsMoving(val) {
  //     this.thisLeftDragItemIsMoving = val;
  //   },
  //   thisLeftDragItemIsMoving(val){
  //     this.$emit('update:leftDragItemIsMoving', val)
  //   }
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
.dragInterClass{
  border: 1px dashed red;
  height: 100%;
}
.field-active{
    // background: rgba(241,241,241,.8);
    border-color: #ddd;

    .widgetDele-btn{
      display: block!important;
    }
    .field_js{
      // background:white;
    }
}
.pointEventNone{
  pointer-events: none;
}
.emptyCtn{
  height: 100%;
}
</style>
