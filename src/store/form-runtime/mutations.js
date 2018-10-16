export default{
  updateFormData (state, payload) {
    state.formData = {...state.formData, ...payload}
  },
  updateFormInfo (state, payload) {
    state.formInfo = {...state.formInfo, ...payload}
  }
}
