import Vue from 'vue';
import Vuex from 'vuex';

// import base from './modules/base';
// import user from './modules/dragItemDate';
// import carPicker from './modules/carPicker';
import dragItemDate from './modules/dragItemDate';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    dragItemDate
    // base,
    // user,
    // carPicker,
  },
});
