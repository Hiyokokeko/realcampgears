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
}
