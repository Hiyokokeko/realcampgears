<template>
  <v-container class="mt-5 px-10">
    <v-card flat>
      <template v-if="loading">
        <v-row class="mx-1" no-gutters>
          <v-chip
            class="mb-1 font-weight-bold"
            color="blue-grey darken-2"
            label
            text-color="white"
          >
            {{ gear.category }}
          </v-chip>
          <v-spacer />
          <p class="caption">更新日時 : {{ gear.created_at }}</p>
        </v-row>
        <div
          class="
            subtitle-1
            mt-2
            blue-grey--text
            darken-4--text
            text-decoration-underline
          "
        >
          {{ gear.maker }}
        </div>
        <div class="display-1 mt-2 mb-4 font-weight-bold">
          {{ gear.name }}
        </div>
        <v-divider />
        <v-sheet>
          <v-row no-gutters>
            <v-col cols="12" sm="4">
              <v-img :src="gear.image.url" contain />
              <div class="text-center font-weight-bold mb-3 mt-1">
                {{ gear.name }}
              </div>
              <v-divider />
              <v-avatar size="50" class="mr-3 my-4 samll-image">
                <v-img :src="gear.image.url" alt="avatar" />
              </v-avatar>
              <v-divder />
            </v-col>
            <v-col cols="12" sm="8">
              <v-sheet class="ml-8">
                <div class="my-5 show-rate">
                  <span class="font-weight-bold"> 総合評価 </span>
                  <v-rating
                    v-model="rating"
                    background-color="orange lighten-1"
                    color="orange darken-2"
                    readonly
                    half-increments
                    class="ml-5"
                    dense
                    large
                  />
                  <span class="ml-5 font-weight-bold">
                    {{ rating }}
                  </span>
                  <small class="ml-10">
                    口コミ数: 0人
                    <br />
                    買いたい: 0人
                  </small>
                </div>
                <v-divder />
                <div class="font-weight-bold my-5">
                  <v-btn color="indigo accent-3 white--text font-weight-bold"
                    >My Gearsに追加</v-btn
                  >
                  <template v-if="like">
                    <v-btn
                      class="mx-5"
                      color="red white--text font-weight-bold"
                      @click="unlikegear"
                    >
                      買いたい解除
                    </v-btn>
                  </template>
                  <template v-else>
                    <v-btn
                      class="mx-5"
                      color="green white--text font-weight-bold"
                      @click="likegear"
                    >
                      買いたい！
                    </v-btn>
                  </template>
                  <v-btn color="orange white--text font-weight-bold">
                    評価・口コミをする
                  </v-btn>
                </div>
                <v-divider />
                <div class="my-4">
                  <h2 class="show-info pl-5">商品詳細</h2>
                  <div class="mt-5">
                    <dl class="product-spec-list">
                      <dt class="product-spec-term">カテゴリ</dt>
                      <dd class="product-spec-description">
                        <a class="product-spec-link">{{ gear.category }}</a>
                      </dd>
                    </dl>
                    <dl class="product-spec-list">
                      <dt class="product-spec-term">メーカー名</dt>
                      <dd class="product-spec-description">
                        <a class="product-spec-link">{{ gear.maker }}</a>
                      </dd>
                    </dl>
                    <dl class="product-spec-list">
                      <dt class="product-spec-term">重量</dt>
                      <dd class="product-spec-description">
                        <span>{{ gear.weight }}</span>
                      </dd>
                    </dl>
                    <dl class="product-spec-list">
                      <dt class="product-spec-term">サイズ</dt>
                      <dd class="product-spec-description">
                        <span>{{ gear.size }}</span>
                      </dd>
                    </dl>
                    <dl class="product-spec-list">
                      <dt class="product-spec-term">販売価格</dt>
                      <dd class="product-spec-description">
                        <span>{{ gear.price }}円(税込)</span>
                      </dd>
                    </dl>
                    <dl class="product-spec-list">
                      <dt class="product-spec-term">商品説明</dt>
                      <dd class="product-spec-description">
                        <span>{{ gear.details }}</span>
                      </dd>
                    </dl>
                  </div>
                </div>
              </v-sheet>
            </v-col>
          </v-row>
        </v-sheet>
      </template>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  data() {
    return {
      // gear: {},
      loading: false,
      rating: 4.3,
      like: false,
    }
  },
  computed: {
    ...mapGetters({
      gear: "gear/gear",
      user: "auth/currentUser",
    }),
  },
  created() {
    this.$axios
      .get(`api/v1/gears/${this.$route.params.id}`)
      .then((res) => {
        this.$store.commit("gear/setGear", res.data, { root: true })
      })
      .then(() => {
        // ユーザーがlikeをしているかの確認
        this.gear.like_users.forEach((f) => {
          if (f.id === this.user.id) {
            this.like = true
          }
        })
        this.loading = true
        // this.$axios
        //   .$get("/api/v1/isLike", {
        //     params: {
        //       user_id: this.user.id,
        //       gear_id: this.gear.id,
        //     },
        //   })
        //   .then((res) => {
        //     console.log(res)
        //     this.like = res
        //     this.loading = true
        //   })
      })
  },
  methods: {
    likegear() {
      this.$axios
        .$post("/api/v1/gear_likes", {
          user_id: this.user.id,
          gear_id: this.gear.id,
        })
        .then((res) => {
          this.$store.commit(
            "flashMessage/setMessage",
            "買いたいに追加しました。",
            { root: true }
          )
          this.$store.commit("flashMessage/setType", "success", { root: true })
          this.$store.commit("flashMessage/setStatus", true, { root: true })
          setTimeout(() => {
            this.$store.commit("flashMessage/setStatus", false, { root: true })
          }, 1000)
          this.like = true
        })
        .catch((err) => {
          this.$store.commit(
            "flashMessage/setMessage",
            "追加に失敗しました。",
            { root: true }
          )
          this.$store.commit("flashMessage/setType", "error", { root: true })
          this.$store.commit("flashMessage/setStatus", true, { root: true })
          setTimeout(() => {
            this.$store.commit("flashMessage/setStatus", false, { root: true })
          }, 1000)
        })
    },
    unlikegear() {
      this.$axios
        .$delete("/api/v1/gear_likes", {
          params: {
            user_id: this.$store.state.auth.currentUser.id,
            gear_id: this.$route.params.id,
          },
        })
        .then((res) => {
          console.log("unfollow 成功")
          this.$store.commit(
            "flashMessage/setMessage",
            "買いたいから外しました。",
            { root: true }
          )
          this.$store.commit("flashMessage/setType", "info", { root: true })
          this.$store.commit("flashMessage/setStatus", true, { root: true })
          setTimeout(() => {
            this.$store.commit("flashMessage/setStatus", false, { root: true })
          }, 1000)
          this.like = false
        })
        .catch((err) => {
          this.$store.commit(
            "flashMessage/setMessage",
            "買いたいから外せませんでした。",
            { root: true }
          )
          this.$store.commit("flashMessage/setType", "error", { root: true })
          this.$store.commit("flashMessage/setStatus", true, { root: true })
          setTimeout(() => {
            this.$store.commit("flashMessage/setStatus", false, { root: true })
          }, 1000)
        })
    },
    likeUser() {
      if (this.gear.like_users.include(this.user)) {
        this.like = true
      } else {
        this.like = false
      }
    },
  },
}
</script>

<style scoped>
.small-image {
  border: 1px solid;
  border-radius: 9px;
  border-color: #bdbdbd;
}
.show-rate {
  font-size: 18px;
  font-weight: 200;
  display: flex;
  align-items: center;
}
.show-info {
  border-left: 3px solid;
  border-color: #2196f3;
}
.product-spec-list {
  border-bottom: 1px solid #e7e7e7;
  margin: 0;
}
.product-spec-term {
  display: inline-block;
  vertical-align: top;
  width: 105px;
  font-size: 15px;
  line-height: 16px;
  color: #999;
  font-weight: 500;
  margin: 12px 0 8px;
}
.product-spec-description {
  display: inline-block;
  vertical-align: top;
  font-size: 15px;
  line-height: 16px;
  letter-spacing: 0.4px;
  color: #2d2926;
  font-weight: 400;
  margin: 12px 0 8px;
  white-space: pre-wrap;
}
.product-spec-link {
  text-decoration: none;
  color: #2196f3;
  display: block;
  text-decoration: underline;
}
</style>
