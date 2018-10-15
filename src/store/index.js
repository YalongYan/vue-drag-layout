import Vue from 'vue'
import Vuex from 'vuex'
import dragContainer from './modules/dragContainer'
// import products from './modules/products'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    dragContainer
  }
  // strict: debug,
})
