export const state = () => ({
  drawer: false,
  gears: [],
  weight: 0,
  price: 0,
})

export const getters = {
  drawer: (state) => state.drawer,
  gears: (state) => state.gears,
  weight: (state) => state.weight,
  price: (state) => state.price,
}

export const mutations = {
  setDrawer(state, drawer) {
    state.drawer = drawer
  },
  setGears(state, gear) {
    state.gears.push(gear)
    let weight = 0.0
    let price = 0.0
    state.gears.forEach((f) => {
      weight += f.weight
      price += f.price
      console.log("終了")
    })
    console.log("スタート")
    state.weight = weight
    state.price = price.toFixed(1)
  },
  unsetGears(state, gear) {
    state.gears.some(function (v, i) {
      if (v.id == gear.id) state.gears.splice(i, 1)
      console.log("削除成功")
    })
    let weight = 0.0
    let price = 0.0
    state.gears.forEach((f) => {
      weight += f.weight
      price += f.price
      console.log("終了")
    })
    console.log("スタート")
    state.weight = weight
    state.price = price.toFixed(1)
  },
  setStatus(state, bool) {
    state.status = bool
  },
}

export const actions = {
  showDrawer({ commit }, payload) {
    commit("setDrawer", payload)
  },
  addGear({ commit }, gear) {
    commit("setGears", gear)
  },
  deleteGear({ commit }, gear) {
    commit("unsetGears", gear)
  },
}
