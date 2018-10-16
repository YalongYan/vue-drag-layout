export default{
  setDataFetchRules (state, payload) {
    // payload 为空即为重置
    if (!Object.keys(payload).length) {
      state.dataFetchRules = {}
      return false
    }
    state.dataFetchRules = Object.assign({}, state.dataFetchRules, payload)
  },
  updateTabNum (state, payload) {
    // if (state.tabNum[payload.key] === null) {
    state.tabNum[payload.key] = payload.value
    // }
  }
}
