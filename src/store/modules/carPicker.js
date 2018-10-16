/*
 * 车辆品牌选择
 */
import types from '../mutation-types';

const state = {
  carData: {
    brand: {
      name: '不限品牌',
      value: '',
    },
    series: {
      name: '不限车系',
      value: '',
    },
    type: {
      name: '不限车型',
      value: '',
    },
  },
};

const getters = {
  getCarBrand: state => state.carData.brand,
  getCarSeries: state => state.carData.series,
  getCarType: state => state.carData.type,
};

const mutations = {
  [types.SET_CAR_BRAND](state, data) {
    state.carData.brand = data;
    state.carData.series = {
      name: '不限车系',
      value: '',
    };
    state.carData.type = {
      name: '不限车型',
      value: '',
    };
  },
  [types.SET_CAR_SERIES](state, data) {
    state.carData.series = data;
    state.carData.type = {
      name: '不限车型',
      value: '',
    };
  },
  [types.SET_CAR_TYPE](state, data) {
    state.carData.type = data;
  },
};

const actions = {
  setCarBrand({ commit }, data) {
    commit(types.SET_CAR_BRAND, data);
  },
  setCarSeries({ commit }, data) {
    commit(types.SET_CAR_SERIES, data);
  },
  setCarType({ commit }, data) {
    commit(types.SET_CAR_TYPE, data);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
