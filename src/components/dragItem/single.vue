<template>
  <!-- pointEventNone 是为了去掉该组件本身的鼠标事件 -->
  <div class="form-view"
  @mousedown="mousedown($event, item)">
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
          <span class="widget-title_js" style="color:;font-size:13;">{{item.title}}</span>
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
      isShowPointEventNone: false, // 是否添加PointEventNone 这个Calss
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
      vuexLayoutContentItem: state => state.dragItemDate.layoutContentItem,
      vuexInitPositionY: state => state.dragItemDate.initPositionY
      // vuexCenterDraggingItemData: state => state.dragItemDate.centerDraggingItemData
    }),
  },
  methods: {
    /*
    ** 移动的思路是 ：
       第一个移动的组件 触发emitLayoutContentItem index 是自身的index 出现红框 
       移入其他single组件的时候 比较 positionY 跟index 可以判断是从上 还是从下面移动过来的 显示上面或者下面的红框 
       positionY初始  mouseup 都是 999 
       移动的最高 最低 位置边界 在single.vue dragConmpent.vue 每个组件的 move 里面
    */
    emitUpdateLayoutContentItem: function (item) {
      this.updateLayoutContentItem(item)
    },
    ...mapActions([
      'updateLayoutContentItem',
      'updatePositionY',
      'updateItemIsMoving',
      'changeLayoutContentItem',
      'updateCenterDraggingItemData',
      'updateCenterDraggingItemData',
      'updateInitPositionY',
      'updateIsNeedUpdateDate',
      'changeActiveStatue']),
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
   emitChangeActiveStatue: function () {
    this.changeActiveStatue(this.index)
   },
    mousedown: function (event, site) {
      var _this = this
      var _site = site
      var isRealMoving = false // 是否移动了 移动了就不触发active  没有移动 相当于click 才增加active class
      var event=event||window.event;
      var _target = event.currentTarget

      var childeNode = this.$el.childNodes[2]

      _target.style.height = '90px'
      
      var startx=event.x;
      var starty=event.y;
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
      _this.emitUpdateInitPositionY(_this.index)
      // this.isShowPointEventNone = true
      this.emitUpdateItemIsMoving(true)

      if (event.preventDefault) {
        event.preventDefault();
        event.stopPropagation();
      } else{
        event.returnValue=false;
      };
        document.onmousemove=function (ev) {
          isRealMoving = true
          if (_this.ismoving) {
            _target.style.border = '1px dashed red'
            // _this.isShowPointEventNone = true
          } else {
            _target.style.border = ''
          }
          if (_this.vuexItemIsMoving) {
            //  _target.style.border = '1px dashed red'
            _this.emitUpdateCenterDraggingItemData(_this.item)
            // _this.emitUpdateInitPositionY(_this.index)
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
            childeNode.style.position='fixed'
            childeNode.style.zIndex=2
            childeNode.style.background='white'

            var vuexPositionY = _this.vuexPositionY
            // vuexPositionY 初始值 和mouseUp之后 都是 999   999代表刚开始拖动
            // if (vuexPositionY === 999) {
            //   var _index = _this.index
            //   var item = {index: _index, position: 1}
            //   _this.emitLayoutContentItem(item)
            // }
            
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
              // if (formViewDataLength === 0) {
              //   _this.emitUpdateEmptyHoverCtn(true)
              //   $('#emptyHoverCtn').show()
              //   // var newItem = {"componentKey": "Text", "title": "新增的的的", "fieldId": "20181108195717mCmp5TOBfA", "inLeft": false, "required": false, "crux": true, "isTextArea": false, "hideTitle": false, "visible": false, 'upActive': false,'downActive': false}
              //   // _this.emitChangeLayoutContentItem(newItem)
              //   return false
              // } else {
              //   _this.emitUpdateEmptyHoverCtn(false)
              // }
              // 遍历组件 看鼠标在哪个组件内部 展示哪个红色的边框

              // 这是判断移动到最下面
              if ((clientY > (minHeightCtnTop + minHeightCtnHeight - 90)) && formViewDataLength > 0) {
                itemStoreM.index = formViewDataLength - 1 
                itemStoreM.position = 2
                _this.emitUpdateLayoutContentItem(itemStoreM)
                _target.style.height = '0'
                _target.style.border = ''
                _this.ismoving =false
                // console.log('max   ' + formViewDataLength)
                // _this.emitUpdatePositionY(formViewDataLength - 1)
                // positionY = formViewDataLength - 1
                return false
              }
              for (let i = 0; i < formViewDataLength; i++) {
                // 没有移动到其他组件
                if (_this.vuexInitPositionY === i) {
                  continue
                }
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
                  _target.style.height = '0'
                   _target.style.border = ''
                   _this.ismoving =false
                }
                if (boolWidth && boolHeightBottom) {
                  itemStoreM.position = 2
                  _this.emitUpdateLayoutContentItem(itemStoreM)
                  _target.style.height = '0'
                  _target.style.border = ''
                  _this.ismoving =false
                }
              }
            }

            
          }
        }
        document.onmouseup=function (ev) {
          _target.style.height = '0'
          _target.style.border = ''
          _this.ismoving =false
          _this.isShowPointEventNone =false
          _this.changeLayoutContentItem()
          _this.emitUpdateIsNeedUpdateDate(false)
          _this.emitUpdateItemIsMoving(false)
          _this.emitUpdateCenterDraggingItemData('')
          document.onmouseup=null;
          _target.style.border=''
          _target.style.height = ''
          _target.style.background = ''
          // 置空后来加上去的样式
          childeNode.style.position=''
          // 只有单纯的点击才增加active class 稍微移动的就不添加
          if (!isRealMoving) {
            _this.emitChangeActiveStatue()
          }
         
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
      .form-control{
        border: 1px solid rgba(224,224,224,1);
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
      background:#F2F2F2;
    }
    .form-control{
      background: #F2F2F2;
    }
}
.pointEventNone{
  pointer-events: none;
}
</style>
