<template>
<div id="editor-component">
  <div v-if="vuexPositionY !== 999">
    <div class="default-area-prev">
      <div class="form-group">
      <label class="checkbox-inline"><input class="edit-component-handler" v-model="Data['inLeft']" @change="changeValue('inLeft')" edit-component-handler="setInLeft" type="checkbox"> 标题在左边</label>			
      </div>
      <div class="form-group">
        <label class="checkbox-inline"><input class="edit-component-handler" v-model="Data['required']" @change="changeValue('required')" edit-component-handler="setRequired" type="checkbox"> 必填</label>
      </div>
      <div class="form-group">
        <label class="checkbox-inline"><input class="edit-component-handler" v-model="Data['crux']" @change="changeValue('crux')" edit-component-handler="setCrux" type="checkbox"> 在列表或任务标题中显示</label>
      </div>
      <div class="form-group">
        <label class="checkbox-inline"><input class="edit-component-handler" v-model="Data['hideTitle']" @change="changeValue('hideTitle')" edit-component-handler="setHideTitle" type="checkbox"> 隐藏标题</label>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'ShowDetails',
  data () {
    return {
    
    }
  },
  computed: {
    ...mapState({
      vuexPositionY: state => state.dragItemDate.positionY,
      layoutContentItem: state => state.dragItemDate.layoutContentItem,
    }),
    Data: function () {
      return this.layoutContentItem[this.vuexPositionY]
    }
  },
  methods: {
    changeValue: function(v) {
      // this.Data[v] = !this.Data[v]
      // console.log(this.layoutContentItem)
    }
  },
  watch: {
    vuexPositionY: function (newValue, oldValue){
      // console.log(newValue + ' ' + oldValue)
    }
  },
  mounted() {
    // console.log(this.item)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
  #editor-component {
    color: #666;
    .default-area-prev{
      border-bottom: 1px solid #BBD1EC;
      .form-group{
        position: relative;
        margin-bottom: 25px;
      }
    }
    label{
      font-weight: 400;
    }
  }  
</style>
