export const state = () => ({
  drawer: false,
  status: false,
  message: "",
  gear: {},
  gears: [],
  weight: 0,
  price: 0,
})

export const getters = {
  drawer: (state) => state.drawer,
  status: (state) => state.status,
  message: (state) => state.message,
  gear: (state) => state.gear,
  gears: (state) => state.gears,
  weight: (state) => state.weight,
  price: (state) => state.price,
}

export const mutations = {
  setDrawer(state, drawer) {
    state.drawer = drawer
  },
  setGears(state, gear) {
    state.gear = gear
    state.gears.push(gear)
  },
  resetGears(state, payload) {
    state.gears = payload
  },
  unsetGears(state, gear) {
    state.gear = gear
    state.gears.some(function (v, i) {
      if (v.id == gear.id) state.gears.splice(i, 1)
      console.log("削除成功")
    })
  },
  setWeight(state, payload) {
    state.weight = payload
  },
  setPrice(state, payload) {
    state.price = payload.toFixed(1)
  },
  setStatus(state, bool) {
    state.status = bool
  },
  setMessage(state, message) {
    state.message = message
  },
}

export const actions = {
  showDrawer({ commit }, payload) {
    commit("setDrawer", payload)
  },
  addGear({ state, commit, dispatch }, gear) {
    commit("setGears", gear)
    let weight = 0.0
    let price = 0.0
    state.gears.forEach((f) => {
      weight += f.weight
      price += f.price
      console.log("終了")
    })
    console.log("代入")
    commit("setWeight", weight)
    commit("setPrice", price)
    dispatch("showGearMessage", {
      status: true,
      message: "My Gearsに追加しました。",
    })
    console.log("表示できた")
  },
  deleteGear({ state, commit, dispatch }, gear) {
    commit("unsetGears", gear)
    let weight = 0.0
    let price = 0.0
    state.gears.forEach((f) => {
      weight += f.weight
      price += f.price
      console.log("終了")
    })
    console.log("代入")
    commit("setWeight", weight)
    commit("setPrice", price)
    dispatch("showGearMessage", {
      status: true,
      message: "My Gearsから削除しました。",
    })
    console.log("表示できた")
  },
  showGearMessage({ commit }, { message, status }) {
    commit("setStatus", status)
    commit("setMessage", message)
    setTimeout(() => {
      commit("setStatus", !status)
    }, 700)
  },
  async registerGears(
    { commit, dispatch, rootState, state },
    { day, zone, number }
  ) {
    try {
      const res = await this.$axios.$post("/api/v1/menus", {
        user_id: rootState.auth.currentUser.id,
        date: day,
        timezone: zone,
        timezone_number: number,
      })
      console.log(res)
      await Promise.all(
        state.gears.map((gear) => {
          this.$axios.post("api/v1/choise_gears", {
            gear_id: gear.id,
            menu_id: res.id,
          })
        })
      )
      await this.$axios
        .$get(`/api/v1/users/${rootState.auth.currentUser.id}`)
        .then((res) => {
          console.log(res)
          commit("auth/setLoginUser", res, { root: true })
          console.log("成功")
        })
      dispatch(
        "flashMessage/showMessage",
        {
          message: "My Gearsを保存しました。",
          type: "success",
          status: true,
        },
        { root: true }
      )
      commit("resetGears", [])
      commit("setWeight", 0)
      commit("setPrice", 0.0)
    } catch (err) {
      console.log(err)
      dispatch(
        "flashMessage/showMessage",
        {
          message: "My Gearsの保存に失敗しました。",
          type: "error",
          status: true,
        },
        { root: true }
      )
    }
  },
}
