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
  setGear({ commit, rootState }, payload) {
    // ログイン中の場合は、いいね総数・いいね未・済のプロパティを追加
    // payload.likedUsersCounts = payload.like_users.length
    // let isLikedPost = false
    // if (rootState.auth.currentUser) {
    //   payload.like_users.forEach((user) => {
    //     if (user.id === rootState.auth.currentUser.id) {
    //       isLikedPost = true
    //     }
    //   })
    // }
    // payload.isLikedPost = isLikedPost
    // // コメント総数プロパティを追加
    // payload.commentCounts = payload.post_comments.length
    // // 親コメント、子コメントで区別
    // let parentComments = []
    // let childComments = []
    // payload.post_comments.forEach(comment => {
    //   if (comment.reply_comment_id === null) {
    //     parentComments.push(comment)
    //   } else {
    //     childComments.push(comment)
    //   }
    // })
    // // 親コメント内に子コメントを格納
    // const commentData = []
    // parentComments.forEach(p => {
    //   p.childComments = []
    //   childComments.forEach(c => {
    //     if (p.id === c.reply_comment_id) {
    //       p.childComments.push(c)
    //     }
    //   })
    //   commentData.push(p)
    // })
    // payload.post_comments = commentData
    // commit('setData', payload)
  },
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
}
