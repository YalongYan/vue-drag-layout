import types from '../mutation-types';

const state = {
  isShowHeader: false,
  currentPageTitle: '',
  isReqError: false,
  fetchLoading: false,
};

const actions = {
  setShowHeader({ commit }, status) {
    commit(types.SET_SHOW_HEADER, status);
  },
  setCurrentPageTitle({ commit }, title) {
    commit(types.SET_CURRENT_PAGE_TITLE, title);
  },
  setNetworkError({ commit }, status) {
    commit(types.SET_NETWORK_ERROR, status);
  },
  setFetchLoading({ commit }, status) {
    commit(types.FETCH_LOADING, status);
  },
};

const getters = {
  isShowHeader: state => state.isShowHeader,
  fetchLoading: state => state.fetchLoading,
  currentPageTitle: state => state.currentPageTitle,
  isReqError: state => state.isReqError,
};

/**
 * 提交同步请求
 * */
const mutations = {
  [types.SET_SHOW_HEADER](state, isShowHeader) {
    state.isShowHeader = isShowHeader;
  },
  [types.FETCH_LOADING](state, fetchLoading) {
    state.fetchLoading = fetchLoading;
  },
  [types.SET_CURRENT_PAGE_TITLE](state, title) {
    state.currentPageTitle = title;
  },
  [types.SET_NETWORK_ERROR](state, isReqError) {
    state.isReqError = isReqError;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
