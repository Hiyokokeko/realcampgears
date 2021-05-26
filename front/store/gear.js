export const state = () => ({
  gears: [],
  gear: {},
})

export const getters = {
  gears: (state) => state.gears,
  gear: (state) => state.gear,
}

export const mutations = {
  setGears(state, gears) {
    state.gears = gears.data
  },
  setGear(state, gear) {
    state.gear = gear
  },
}

export const actions = {
  async getGears({ commit }) {
    const gears = {
      data: "",
    }
    await this.$axios
      .get("api/v1/gears")
      .then((res) => {
        gears.data = res.data
        commit("setGears", gears)
      })
      .catch((error) => {
        console.log(error)
      })
  },
}
