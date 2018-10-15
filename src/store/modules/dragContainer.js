const state = {
  layoutContentItem: [{text: '1111', upActive: false, downActive: false}, {text: '2222', upActive: false, downActive: false}, {text: '3333', upActive: false, downActive: false}, {text: '44444', upActive: false, downActive: false}, {text: '55555', upActive: false, downActive: false}],
  checkoutStatus: null
}

// getters
const getters = {
  cartTotalPrice: (state, getters) => {
    return state.layoutContentItem
  }
}

// actions
const actions = {
  getAllProducts ({ commit }) {
    commit('setProducts', products)
  }
}

// mutations
const mutations = {
  setProducts (state, products) {
    // state.all = products
    console.log(state.layoutContentItem)
  }

  // decrementProductInventory (state, { id }) {
  //   const product = state.all.find(product => product.id === id)
  //   product.inventory--
  // }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
