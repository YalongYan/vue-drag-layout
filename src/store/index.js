import Vue from 'vue'
import Vuex from 'vuex'
// import missionCenter from './mission-center/index'
// import formRuntime from './form-runtime/index'
import dragItemDate from './dragItemDate/index'

Vue.use(Vuex)
export default new Vuex.Store({
  // state: {},
  modules: {
    dragItemDate
  }
})
