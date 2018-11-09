<template>
  <li class="mainCtn compents-li" :class="{pointEventNone: isPointEventNone}" @mousedown="mousedown($event, item)">
    <div> {{item.title}} </div>
  </li>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'dragCompent',
  props: {
    item: {
      type: Object,
      default: () => ({title: '', icon: ''})
    },
    value: {
      type: String,
      default:''
    }
  },
  data () {
    return {
      isPointEventNone: false
    }
  },
   computed: {
    ...mapState({
      vuexLeftDragItemIsMoving: state => state.dragItemDate.leftDragItemIsMoving,
      vuexLayoutContentItem: state => state.dragItemDate.layoutContentItem
    }),
  },
  methods: {
    emitUpdateLeftDragItemIsMoving: function (bool) {
      this.updateLeftDragItemIsMoving(bool)
    },
    emitUpdatePositionY: function (num) {
      this.updatePositionY(num)
    },
    emitUpdateLayoutContentItem: function (item) {
      this.updateLayoutContentItem(item)
    },
    emitUpdateIsNeedUpdateDate: function (bool) {
      this.updateIsNeedUpdateDate(bool)
    },
    emitUpdateLeftDraggingItemData: function (data) {
      this.updateLeftDraggingItemData(data)
    },
    ...mapActions(['updateLeftDragItemIsMoving', 'updatePositionY', 'updateLayoutContentItem', 'changeLayoutContentItem', 'updateIsNeedUpdateDate', 'updateLeftDraggingItemData']),
    /*
    ** 
    */
    mousedown: function (event, site) {
      var _this = this
      var _site = site
      var event=event||window.event;
      var _target = event.target.parentElement
      var startx=event.clientX;
      var starty=event.clientY;
      var sb_bkx=startx-event.target.offsetLeft;
      var sb_bky=starty-event.target.offsetTop;
      // 窗口的宽高度
      var ww = document.documentElement.clientWidth;
      var wh = window.innerHeight;
      this.ismoving = true
      this.emitUpdateLeftDragItemIsMoving(true)
      // console.log('vuexLeftDragItemIsMoving' + this.vuexLeftDragItemIsMoving)
      // start 这段代码用来复位用的
      var endx=event.clientX-sb_bkx;
      var endy=event.clientY-sb_bky;
      // end
      if (event.preventDefault) {
        event.preventDefault();
        event.stopPropagation();
      } else{
        event.returnValue=false;
      };
        var cloneLeftCtnItem = document.getElementById('cloneLeftCtnItem')
        var fatherNode = event.target.parentElement.parentElement

        document.onmousemove=function (ev) {
          if (_this.ismoving) {
            _this.emitUpdateIsNeedUpdateDate(true)  
            _this.emitUpdateLeftDraggingItemData(_this.item)
            _this.isPointEventNone = true
            _target.style.zIndex = 99;
            var event=ev||window.event;
            // 控制在浏览器窗口内移动
            if (event.clientY < 0 || event.clientX < 0 || event.clientY > wh || event.clientX > ww) {
              return false;
            };
            var endx=event.clientX-sb_bkx;
            var endy=event.clientY-sb_bky;
            var _this_left = _target.style.left
            var _this_top = _target.style.top
  
            cloneLeftCtnItem.style.left = endx+'px';
            cloneLeftCtnItem.style.top = endy+'px';
            fatherNode.append(cloneLeftCtnItem)  
            _this.$emit("input",_this.item.title);
            cloneLeftCtnItem.style.display = 'block'

            // start中间组件拖动的上下边界判断
            var middleHeaderHeight = 30
            var middleItemHeight = 90
            var layoutContentItemLength = _this.vuexLayoutContentItem.length
            var maxHeight = layoutContentItemLength * middleItemHeight
            var minHeigth = middleHeaderHeight
            var itemStoreM = {index: '', position: ''}
            // console.log(itemStoreM)
            if (ev.y > maxHeight) {
              itemStoreM.index = layoutContentItemLength - 1
              itemStoreM.position = 2
              _this.emitUpdateLayoutContentItem(itemStoreM)
            } else if (ev.y < minHeigth) {
              itemStoreM.index = 0
              itemStoreM.position = 1
              _this.emitUpdateLayoutContentItem(itemStoreM)
            }
            // end中间组件拖动的上下边界判断
          }
        }
        document.onmouseup=function (ev) {
          _this.isPointEventNone = false
          _this.ismoving = false
          // mouseup之后  positionY 恢复 999 状态
          _this.emitUpdatePositionY(999)
          _this.emitUpdateLeftDragItemIsMoving(false)
          _target.style.zIndex = '';
          // console.log('up')
          document.onmouseup=null;
          cloneLeftCtnItem.style.display = 'none'
          _this.changeLayoutContentItem()
          _this.emitUpdateIsNeedUpdateDate(false)
          _this.emitUpdateLeftDraggingItemData('')
        }
    }
  },
  watch: {
  },
  mounted() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.pointEventNone{
  pointer-events: none;
  /* position: fixed; */
}
.enter-ctn{
    font-size: 12px;
    /*background: white;*/
    border: 1px solid red;
    border-style: dashed;
}
</style>
