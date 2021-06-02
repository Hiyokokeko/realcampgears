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
  // setGear({ commit, rootState }, payload) {
  // },
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
  async likeGear({ commit, rootState }, authData) {
    await this.$axios
      .$post("/api/v1/gear_likes", {
        user_id: authData.user,
        gear_id: authData.gear,
      })
      .then(() => {
        commit("flashMessage/setMessage", "買いたいに追加しました。", {
          root: true,
        })
        commit("flashMessage/setType", "success", { root: true })
        commit("flashMessage/setStatus", true, { root: true })
        setTimeout(() => {
          commit("flashMessage/setStatus", false, { root: true })
        }, 1000)
        console.log(rootState.auth.currentUser.id)
        this.$axios
          .$get(`/api/v1/users/${rootState.auth.currentUser.id}`)
          .then((res) => {
            console.log(res)
            commit("auth/setLoginUser", res, { root: true })
            console.log("成功")
          })
      })
      .catch((err) => {
        commit("flashMessage/setMessage", "追加に失敗しました。", {
          root: true,
        })
        commit("flashMessage/setType", "error", { root: true })
        commit("flashMessage/setStatus", true, { root: true })
        setTimeout(() => {
          commit("flashMessage/setStatus", false, { root: true })
        }, 1000)
      })
  },
  async unLikeGear({ rootState, commit }, authData) {
    await this.$axios
      .$delete("/api/v1/gear_likes", {
        params: {
          user_id: authData.user,
          gear_id: authData.gear,
        },
      })
      .then(() => {
        console.log("unfollow 成功")
        commit("flashMessage/setMessage", "買いたいから外しました。", {
          root: true,
        })
        commit("flashMessage/setType", "info", { root: true })
        commit("flashMessage/setStatus", true, { root: true })
        setTimeout(() => {
          commit("flashMessage/setStatus", false, { root: true })
        }, 1000)
        this.$axios
          .$get(`/api/v1/users/${rootState.auth.currentUser.id}`)
          .then((res) => {
            console.log(res)
            commit("auth/setLoginUser", res, { root: true })
            console.log("成功")
          })
      })
      .catch((err) => {
        commit("flashMessage/setMessage", "買いたいから外せませんでした。", {
          root: true,
        })
        commit("flashMessage/setType", "error", { root: true })
        commit("flashMessage/setStatus", true, { root: true })
        setTimeout(() => {
          commit("flashMessage/setStatus", false, { root: true })
        }, 1000)
      })
  },
  async review({ commit }, authData) {
    const form = new FormData()
    form.append("title", authData.title)
    form.append("content", authData.content)
    form.append("rate", authData.rate)
    form.append("user_id", authData.user_id)
    form.append("gear_id", authData.gear_id)
    if (authData.image !== null) {
      form.append("image", authData.image)
    }
    console.log(authData.image)
    await this.$axios
      .$post("/api/v1/reviews", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        commit("flashMessage/setMessage", "口コミを投稿しました", {
          root: true,
        })
        commit("flashMessage/setType", "success", { root: true })
        commit("flashMessage/setStatus", true, { root: true })
        setTimeout(() => {
          commit("flashMessage/setStatus", false, { root: true })
        }, 1000)
        this.$axios.$get(`/api/v1/gears/${authData.gear_id}`).then((res) => {
          commit("setGear", res)
          console.log("成功")
        })
      })
      .catch((err) => {
        commit("flashMessage/setMessage", "口コミの投稿に失敗しました。", {
          root: true,
        })
        commit("flashMessage/setType", "error", { root: true })
        commit("flashMessage/setStatus", true, { root: true })
        setTimeout(() => {
          commit("flashMessage/setStatus", false, { root: true })
        }, 1000)
      })
  },
  async editReview({ commit }, authData) {
    const form = new FormData()
    form.append("title", authData.title)
    form.append("content", authData.content)
    form.append("rate", authData.rate)
    form.append("user_id", authData.user_id)
    form.append("gear_id", authData.gear_id)
    if (authData.image !== null) {
      form.append("image", authData.image)
    }
    console.log(authData.image)
    await this.$axios
      .$put(`/api/v1/reviews/${authData.reviewId}`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: {
          review_id: authData.reviewId,
        },
      })
      .then(() => {
        commit("flashMessage/setMessage", "口コミを更新しました", {
          root: true,
        })
        commit("flashMessage/setType", "info", { root: true })
        commit("flashMessage/setStatus", true, { root: true })
        setTimeout(() => {
          commit("flashMessage/setStatus", false, { root: true })
        }, 1000)
        this.$axios.$get(`/api/v1/gears/${authData.gear_id}`).then((res) => {
          commit("setGear", res)
          console.log("成功")
        })
      })
      .catch((err) => {
        commit("flashMessage/setMessage", "口コミの投稿に失敗しました。", {
          root: true,
        })
        commit("flashMessage/setType", "error", { root: true })
        commit("flashMessage/setStatus", true, { root: true })
        setTimeout(() => {
          commit("flashMessage/setStatus", false, { root: true })
        }, 1000)
      })
  },
}
