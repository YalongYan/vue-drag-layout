<template>
   <div class="root">
      <SortableList lockAxis="y" v-model="items">
      <div class="handleBar">handele bar</div>
        <SortableItem v-for="(item, index) in items" :index="index" :key="index" :item="item"/>
        <!-- <SortableItem :item="11111"/> -->
      </SortableList>

      <!-- <SortableList lockAxis="y" v-model="items2"> -->
      <SortableList  v-model="items2">
      <div class="handleBar">不气温</div>
        <SortableItem v-for="(item, index) in items2" :index="index" :key="index" :item="item"/>
        <!-- <SortableItem :item="11111"/> -->
      </SortableList>

      <div style = 'clear:both'></div>
    </div>
</template>

<script>
// import { SlickList, SlickItem } from './vue-slicksort';
import { ContainerMixin, ElementMixin } from './vue-slicksort';
const SortableList = {
  mixins: [ContainerMixin],
  template: `
    <ul class="list">
      <slot />
    </ul>
  `
};

const SortableItem = {
  mixins: [ElementMixin],
  props: ['item'],
  template: `
    <li class="list-item">{{item}}</li>
  `
};

export default {
  name: 'HelloWorld',
  components: {
    SortableItem,
    SortableList
  },
  data () {
    return {
       items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
        'Item 5',
        'Item 6',
        'Item 7',
        'Item 8'
      ],
      items2: [
        'Item 1',
        'sadasd',
        '撒打算是所',
        '三大球'
      ]
    }
  },
  methods: { 

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >

.enter-ctn{
    font-size: 12px;
    /*background: white;*/
    border: 1px solid red;
    border-style: dashed;
}
.list{
  width: 100px;
  text-align: left;
  margin: 0 auto;
  float: left;
  margin-left: 100px;
}
.list-item{
  width: auto;
}
.handleBar{
  color: red;
  line-height: 60px;
  height: 60px;
  text-align: center;
  background: gray;
}

</style>
