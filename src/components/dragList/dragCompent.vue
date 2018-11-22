<template>
  <li class="mainCtn compents-li" :class="{pointEventNone: isPointEventNone}" @mousedown="mousedown($event, item)">
    <div> {{item.title}} </div>
  </li>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import $ from 'jquery'
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
      vuexLayoutContentItem: state => state.dragItemDate.layoutContentItem,
      vuexEmptyHoverCtn: state => state.dragItemDate.emptyHoverCtn
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
    emitChangeLayoutContentItem: function (data) {
      this.changeLayoutContentItem(data)
    },
    emitUpdateEmptyHoverCtn: function (bool) {
      this.updateEmptyHoverCtn(bool)
    },
    ...mapActions([
      'updateLeftDragItemIsMoving',
      'updatePositionY',
      'updateLayoutContentItem',
      'changeLayoutContentItem',
      'updateIsNeedUpdateDate',
      'updateLeftDraggingItemData',
      'updateEmptyHoverCtn']),
    /*
    ** 
    */
    mousedown: function (event, site) {
      // var isNeedAddNewData = false
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
            // console.log(111)
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
            fatherNode.appendChild(cloneLeftCtnItem)  
            _this.$emit("input",_this.item.title);
            cloneLeftCtnItem.style.display = 'block'
            // start 根据鼠标的位置 显示红边框
            var clientX = event.clientX
            var clientY = event.clientY
            var formViewData = $(".form-view")
            var formViewDataLength = formViewData.length
            var itemStoreM = {index: '', position: ''}
            // minHeightCtn 的高度会实时更新
            var minHeightCtnHeight = parseInt($('#minHeightCtn')[0]['clientHeight'])
            var minHeightCtnWidth = parseInt($('#minHeightCtn')[0]['clientWidth'])
            var minHeightCtnTop = parseInt($('#minHeightCtn')[0]['offsetTop'])
            var minHeightCtnLeft = parseInt($('#minHeightCtn')[0]['offsetLeft'])
            // 在区域内移动
            if ((clientX > minHeightCtnLeft && clientX < (minHeightCtnLeft + minHeightCtnWidth)) && (clientY >= minHeightCtnTop && clientY < (minHeightCtnTop + minHeightCtnHeight))) {
              // 开始没数据 需要新增数据
              if (formViewDataLength === 0) {
                _this.emitUpdateEmptyHoverCtn(true)
                $('#emptyHoverCtn').show()
                // var newItem = {"componentKey": "Text", "title": "新增的的的", "fieldId": "20181108195717mCmp5TOBfA", "inLeft": false, "required": false, "crux": true, "isTextArea": false, "hideTitle": false, "visible": false, 'upActive': false,'downActive': false}
                // _this.emitChangeLayoutContentItem(newItem)
                return false
              } else {
                _this.emitUpdateEmptyHoverCtn(false)
              }
              // 遍历组件 看鼠标在哪个组件内部 展示哪个红色的边框
              // 这是判断移动到最下面
              if ((clientY > (minHeightCtnTop + minHeightCtnHeight - 90)) && formViewDataLength > 0) {
                itemStoreM.index = formViewDataLength - 1 
                itemStoreM.position = 2
                _this.emitUpdateLayoutContentItem(itemStoreM)
                return false
              }
              for (let i = 0; i < formViewDataLength; i++) {
                itemStoreM.index = i
                var thisDom = formViewData[i]
                var offsetLeft = parseInt(thisDom['offsetLeft'])
                var offsetTop = parseInt(thisDom['offsetTop'])
                var clientHeight = 90 // 固定是90px
                var offsetWidth = parseInt(formViewData[i].clientWidth)
                var boolWidth = clientX > offsetLeft && clientX < (offsetLeft + offsetWidth)
                // 上半部分
                var boolHeightTop = clientY > offsetTop && clientY < (offsetTop + clientHeight/2)
                // 下半部分
                var boolHeightBottom = clientY > (offsetTop + clientHeight/2) && clientY < (offsetTop + clientHeight)
                if (boolWidth && boolHeightTop) {
                  itemStoreM.position = 1
                  _this.emitUpdateLayoutContentItem(itemStoreM)
                }
                if (boolWidth && boolHeightBottom) {
                  itemStoreM.position = 2
                  _this.emitUpdateLayoutContentItem(itemStoreM)
                }
              }
            }
          }
        }
        document.onmouseup=function (ev) {
          if (_this.vuexEmptyHoverCtn) {
            var newItem = {"componentKey": "Text", "title": "新增的的的", "fieldId": "20181108195717mCmp5TOBfA", "inLeft": false, "required": false, "crux": true, "isTextArea": false, "hideTitle": false, "visible": false, 'upActive': false,'downActive': false}
            _this.emitChangeLayoutContentItem(newItem)
            $('#emptyHoverCtn').hide()
          }
          var event=ev||window.event;
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
    // var formViewData = $(".form-view")
    // var formViewDataLength = formViewData.length
    // for (let i = 0; i < formViewDataLength; i++) {
    //   var thisDom = formViewData[i]
    //   var offsetLeft = formViewData[i].offsetLeft
    //   var offsetTop = formViewData[i].offsetTop
    //   var offsetHeight = formViewData[i].offsetHeight
    //   var offsetWidth = formViewData[i].offsetWidth
    // }
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
