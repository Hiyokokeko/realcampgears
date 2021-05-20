export const state = () => ({
  gears: [],
})

export const getters = {
  gears: (state) => state.gears,
}

export const mutations = {
  setGears(state, gears) {
    state.gears = gears.data
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
