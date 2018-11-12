<template>
<div class="form-view">
  <div class="form-layout">
    <div class="twoColumns field field_js left">
      <Children
        :subItem = 'item.layoutDetail[0].layoutDetail'
        :indexX = index
        :indexY = '0'/>
    </div>
    <div class="twoColumns field field_js right">
      <Children
        :subItem = 'item.layoutDetail[1].layoutDetail'
        :indexX = index
        :indexY = '0'/>
    </div>
    <div style="clear:both"></div>
  </div>
  <!-- toolbar -->
  <div class="form-layout-toolbar" style="display:none">
    <span class="edit-btn j_cancel-drag field_table_js"><i class="iconfont icon-pencil"></i>编辑</span>
    <span class="j_layoutCopy layoutCopy-btn j_cancel-drag"><i class="iconfont icon-plus"></i>复制</span>
    <span class="j_layoutDrag layoutDrag-btn"><i class="iconfont icon-tuozhuai"></i>拖动</span>
    <span class="j_layoutDele layoutDele-btn j_cancel-drag"><i class="iconfont icon-delete"></i>删除</span>
  </div>
</div>
</template>

<script>
import Children from '@/components/dragItem/children/'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'TwoColumns',
  // prop: ['item', 'index'],
  props: {
   item: {
      type: Object,
      default: () => ({title: ''})
    },
   // indexX 
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
    // turnItemToArr: function(){
    //   var aa = this.item.layoutDetail[0]
    //   console.log(aa)
    //   return this.item
    // }
  },
  methods: {
  },
  components: {
    Children
  },
  mounted() {
    // console.log(this.item)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.form-view{
  .twoColumns{
    width: 50%;
    float: left;
    padding: 0;
    height: 90px;
    box-sizing: border-box;
  }
  .left{
    border-right: 1px solid #ddd;
  }
  .right{

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
