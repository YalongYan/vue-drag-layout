<template>
    <li class="mainCtn compents-li" :class="{pointEventNone: isPointEventNone}" @mousedown="mousedown($event, item)">
        <!-- {{item.icon}} -->
        <div> {{item.text}} </div>
    </li>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'dragCompent',
  props: {
    item: {
      type: Object,
      default: () => ({text: '', icon: ''})
    },
    value: {
      type: String,
      default:''
    },
    leftDragItemIsDraged: {
      type: Boolean,
      default: false
    },
    leftDragItemIsMoving: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isPointEventNone: false,
      thisLeftDragItemIsDraged: this.leftDragItemIsDraged,
      thisLeftDragItemIsMoving: this.leftDragItemIsMoving,
      positionX: 999, // 这是左边的 x 位置
      positionY: 999 // 这是坐标的 y 位置
    }
  },
   computed: {
    ...mapState({
      // layoutContentItem: state => state.dragItemDate.layoutContentItem,
      vuexPositionY: state => state.dragItemDate.positionY
    }),
  },
  methods: {
    emitLayoutContentItem: function (item) {
      // var item = {index: 1, position: 1}
      this.updateLayoutContentItem(item)
    },
    emitUpdatePositionY: function (position) {
      this.updatePositionY(position)
    },
    ...mapActions(['updateLayoutContentItem', 'updatePositionY']),
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
      // start 这段代码用来复位用的
      var endx=event.clientX-sb_bkx;
      var endy=event.clientY-sb_bky;
    //   _target.style.left=endx+'px';
    //   _target.style.top=endy+'px';
      // end
      if (event.preventDefault) {
        event.preventDefault();
        event.stopPropagation();
      } else{
        event.returnValue=false;
      };
        var cloneLeftCtnItem = document.getElementById('cloneLeftCtnItem')
        
        // console.log(cloneLeftCtnItem)
        var fatherNode = event.target.parentElement.parentElement

        document.onmousemove=function (ev) {
          if (_this.ismoving) {
            _this.thisLeftDragItemIsDraged = true
            // fatherNode.append(cloneLeftCtnItem)  
            _this.isPointEventNone = true
            _target.style.zIndex = 99;
            var event=ev||window.event;
            // 控制在浏览器窗口内移动
            if (event.clientY < 0 || event.clientX < 0 || event.clientY > wh || event.clientX > ww) {
              return false;
            };
            // console.log(_target)
            var endx=event.clientX-sb_bkx;
            var endy=event.clientY-sb_bky;
            var _this_left = _target.style.left
            var _this_top = _target.style.top

            cloneLeftCtnItem.style.left = endx+'px';
            cloneLeftCtnItem.style.top = endy+'px';
            fatherNode.append(cloneLeftCtnItem)  
            _this.$emit("input",_this.item.text);
            cloneLeftCtnItem.style.display = 'block'
            
            // 这里开始计算坐标位置 移动的时候 计算出坐标位置进行交互
            var leftContainerWidth = 250;
            var centerHeadHeight = 30;
            var centerItemHeight = 90;
            if(_this.leftDragItemIsMoving) {
              var y = ev.y
              // yIndex 是鼠标初拖动进入的位置
              var yIndex = parseInt((y-30)/90)
              console.log(yIndex)
              if (yIndex != _this.vuexPositionY) {
                _this.emitUpdatePositionY(yIndex)
                var item = {index: _this.vuexPositionY, position:1}
                _this.emitLayoutContentItem(item)
              }
              // console.log(_this.vuexPositionY)
              // console.log(yIndex)
              if(y < (yIndex*90 + 30 + 45)){

              } else {
                
              }
            }
          }
        }
        document.onmouseup=function (ev) {
          _this.isPointEventNone = false
          _this.ismoving =false
          _this.thisLeftDragItemIsDraged = false
          _target.style.zIndex = '';
          console.log('mouseup')
          document.onmouseup=null;
          cloneLeftCtnItem.style.display = 'none'
        }
    }
    
  },
  watch:{
    leftDragItemIsDraged(val) { 
      this.thisLeftDragItemIsDraged = val;
    },
    thisLeftDragItemIsDraged(val){
      this.$emit('update:leftDragItemIsDraged', val)
    },
    leftDragItemIsMoving(val) {
      this.thisLeftDragItemIsMoving = val;
    },
    thisLeftDragItemIsMoving(val){
      this.$emit('update:leftDragItemIsMoving', val)
    }
  },
  mounted() {
    // this._cloneLeftItemText = this.cloneLeftItemText
    // console.log(this.thisCloneLeftItemText)
    // console.log(this.value)
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
