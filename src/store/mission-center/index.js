import mutations from './mutations'
export default{
  namespaced: true,
  state: {
    tabNum: {
      curtasks: null,
      listcopy: null
    },
    dataFetchRules: {
    }
  },
  mutations
}
