export const state = () => ({
  drawer: false,
  gears: [],
  status: false,
})

export const getters = {
  drawer: (state) => state.drawer,
  gears: (state) => state.gears,
  status: (state) => state.status,
}

export const mutations = {
  setDrawer(state, drawer) {
    state.drawer = drawer
  },
  setGears(state, gear) {
    state.Gears.push(gear)
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
}
