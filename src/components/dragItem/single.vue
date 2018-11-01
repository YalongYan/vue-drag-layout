<template>
  <!-- pointEventNone 是为了去掉该组件本身的鼠标事件 -->
  <div class="form-view"
  :class="{pointEventNone: ismoving}"
  @click='dragCompentClick()'
  @mousedown="mousedown($event, item)"
  @mouseenter = "middleOnmouseEnter($event)"
  @mouseleave = "middleOnmouseLeave($event)">
    <!-- <div class="field field_js field-active"> -->  
    <div class="prefabricatedCtn prefabricatedUp" v-if="item.upActive"></div>
    <div class="innerCtn">
      <!-- <div class="field field_js" :class="{'field-active': item.active}"> -->
      <div class="field field_js">
        <span class="widgetDele-btn">
          <i class="iconfont icon-plus icon-copy-margin j_widgetCopy">+</i>
          <i class="iconfont icon-cancel02 j_widgetDele">x</i>
        </span>
        <div class="widget-title">
          <span class="widget-title_js" style="color:;font-size:13;">{{item.text}}</span>
          <i class="iconfont icon-pencil j_edit-title edit-title">B</i>
        </div>
        <div class="widget-content">  
          <input type="text" class="form-control large" readonly=""> (%)
        </div>
      </div>
    </div>  
    <div class="prefabricatedCtn prefabricatedDown" v-if="item.downActive"></div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Single',
  // prop: ['item', 'index'],
  props: {
   item: {
      type: Object,
      default: () => ({text: ''})
    },
   index: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
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
      vuexItemIsMoving: state => state.dragItemDate.itemIsMoving
    }),
  },
  methods: {
    /*
    ** 
    */
  //  ...mapActions(['updatePositionY']),
    emitLayoutContentItem: function (item) {
      // var item = {index: 1, position: 1}
      this.updateLayoutContentItem(item)
    },
    ...mapActions(['updateLayoutContentItem', 'updatePositionY', 'updateItemIsMoving', 'changeLayoutContentItem']),
    // ...mapActions(['updateLayoutContentItem']),

   emitUpdatePositionY: function (index) {
     this.updatePositionY(index)
   },
   emitUpdateItemIsMoving: function (bool) {
     this.updateItemIsMoving(bool)
   },
   middleOnmouseEnter: function (event) {
     console.log('mouseEnter')
     this.emitUpdatePositionY(this.index)
    //  var _this = this
    //  var leftContainerWidth = 250;
    //   var centerHeadHeight = 30;
    //   var centerItemHeight = 90;
    //   var y = event.y
    //   // yIndex 是鼠标初拖动进入的位置
    //   // var yIndex = parseInt((y-30)/90)
    //   var middlePositon_y = _this.vuexPositionY * 90 + 45 + 30
    //   var item = {index: _this.vuexPositionY, position: ''}
    //   if (y < middlePositon_y) {
    //     item.position = 1
    //   } else {
    //     item.position = 2
    //   }
    //   // 这里触发修改vuex里面的数据
    //   if (_this.vuexItemIsMoving) {
    //     _this.emitLayoutContentItem(item)
    //   }
   },
   middleOnmouseLeave: function (event) {
    // this.emitUpdatePositionY(999)
    // console.log(11111)
   },
    mousedown: function (event, site) {
      // console.log(site)
      // site.active =!site.active
      var _this = this
      var _site = site
      var event=event||window.event;
      var _target = event.currentTarget
      // console.log(_target)
      // console.log(this)
      var childeNode = this.$el.childNodes[2]
      // console.log(this.$el.childNodes)
      // var startx=event.clientX;
      var startx=event.x;
      var starty=event.y;
      // var _offsetLeft = this.$el.offsetLeft
      // var _offsetTop = this.$el.offsetTop
      var _offsetLeft = childeNode.offsetLeft
      var _offsetTop = childeNode.offsetTop
      // var starty=event.clientY;
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
            site.isFixed =true
            site.showUp =true
            var event=ev||window.event;
            if (event.clientY < 0 || event.clientX < 0 || event.clientY > wh || event.clientX > ww) {
              return false;
            };
            // console.log(_this.vuexPositionY)
            // 这是父节点
            var endx=event.clientX-sb_bkx;
            var endy=event.clientY-sb_bky;
            // _target.style.width=targetWidth+'px';
            // _target.style.height=0;
            // _target.style.height=targetHeight+'px';

            // _target.style.border='1px dashed red'
            childeNode.style.left=endx+'px';
            childeNode.style.top=endy+'px';
            childeNode.style.width=targetWidth+'px';
            childeNode.style.height=targetHeight+'px';
            childeNode.style.position='fixed'
            childeNode.style.zIndex=2
            childeNode.style.background='white'
            // console.log('1111' + _this.thisLeftDragItemIsMoving)
            // if(_this.leftDragItemIsMoving) {
            //   console.log(ev)
            // }
            var leftContainerWidth = 250;
            var centerHeadHeight = 30;
            var centerItemHeight = 90;
            // var y = ev.offsetY - 45
            var y = ev.y
            // console.log(ev)
            // yIndex 是鼠标初拖动进入的位置
            // var yIndex = parseInt((y-30)/90)
            var temp = _this.vuexPositionY
            // if (y > temp * 90 + 45 + 30) {
            //   var middlePositon_y = temp * 90 + 45 + 30 + 45
            // } else {
            //   var middlePositon_y = temp * 90 + 45 + 30
            // }
            var middlePositon_y = _this.vuexPositionY * 90 + 45 + 30
            // var middlePositon_y = _this.vuexPositionY * 90 + 45 + 30 + 45
            var item = {index: _this.vuexPositionY, position: ''}
            console.log('vuexPositionY' + _this.vuexPositionY + 'y:' + y + 'middlePositon_y' + middlePositon_y)
            if (y < middlePositon_y) {
              item.position = 1
            } else {
              item.position = 2
            }
            // 这里触发修改vuex里面的数据
            if (_this.vuexItemIsMoving) {
              // console.log(item.index + '  ' + item.position)
              _this.emitLayoutContentItem(item)
            }

          }
        }
        document.onmouseup=function (ev) {
          _this.ismoving =false
          _this.emitUpdateItemIsMoving(false)
          document.onmouseup=null;
          _target.style.border=''
          _this.changeLayoutContentItem()
         
          childeNode.style.left=''
          childeNode.style.top='';
          childeNode.style.width='';
          childeNode.style.height='';
          childeNode.style.position=''
          childeNode.style.zIndex=0
          childeNode.style.background=''
        }
    },
    mouseup: function (event, site) {
      document.onmousemove=null;
      site.isFixed = false;
    },

    mouseover: function (event, site) {
      if (localStorage.ismoving == 1) {
        // console.log( 'localStorage.initY' + localStorage.initY )
        console.log( 'over')
        // console.log( event)
      }

      // console.log('over')

      // for(var i = 0; i < this.baseData1.length; i++){
      //   this.baseData1[i].showUp = false
      // }
      // for(var j = 0; j< this.baseData2.length; j++){
      //   this.baseData2[j].showUp = false
      // }
      // site.showUp = true
    },
    
    mouseout: function (event, site) {
      if (localStorage.ismoving == 1) {
        console.log('out')
        // console.log( event )
        // localStorage.initY = event.y
      }
    },
    dragCompentClick: function() {
      this.$emit('dragCompentClick')
    }
    
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
.form-view{
  box-sizing: border-box;
  .field_js{
    border-bottom: 1px solid #ddd;
    position: relative;
    padding: 20px;
    // background: white;
    height: 49px;
   
    .widgetDele-btn{
      font-size: 18px;
      position: absolute;
      right: 0;
      top: -4px;
      margin-top: -12px;
      color: #d14836;
      display: none;
      cursor: pointer;
      z-index: 2;
      background-color: #F2F2F2;
      border-radius: 5px 0 0;
      width: 50px;
      
      .icon-copy-margin {
        margin-right: 6px;
        margin-left: 8px;
        float: left;
      }
    }
    .widget-title{
      font-size: 14px;
      font-weight: 700;
      line-height: 1;
      display: block;
      cursor: default;
      word-wrap: break-word;
      word-break: break-all;
      margin-bottom: 10px;
      .widget-title_js{
        color: rgba(51,51,51,1);
      }
      .edit-title{
        display: none;
      }
      &:hover{
        .edit-title{
          display: inline-block;
        }
      }
    }
    .widget-content{
      .large{
        width: 95%;
      }
    }
  }
  .prefabricatedCtn{
    width: 100%;
    height: 90px;
    border: 1px dashed red;
    // display: none;
  }
}
.field-active{
    // background: rgba(241,241,241,.8);
    border-color: #ddd;

    .widgetDele-btn{
      display: block!important;
    }
    .field_js{
      background:white;
    }
}
.pointEventNone{
  pointer-events: none;
}
</style>
