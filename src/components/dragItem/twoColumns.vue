<template>
  <!-- pointEventNone 是为了去掉该组件本身的鼠标事件 -->
  <div class="form-view"
  @click='dragCompentClick()'>
    <!-- <div class="field field_js field-active"> -->  
    <div class="prefabricatedCtn prefabricatedUp" v-if="item.upActive"></div>
    <div class="innerCtn"
      :class="{pointEventNone: ismoving}"
      @mouseenter = "middleOnmouseEnter($event)">
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
  name: 'TwoColumns',
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
      vuexPositionY: state => state.dragItemDate.positionY
    }),
  },
  methods: {
  }
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
