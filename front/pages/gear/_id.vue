<template>
  <v-container class="mt-5 px-10">
    <template v-if="loading">
      <v-card flat>
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
          <p class="caption">更新日時 : {{ createDate }}</p>
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
              <v-img v-if="gear.image.url" :src="gear.image.url" contain />
              <v-img v-else :src="defaultImage" contain />
              <div class="text-center font-weight-bold mb-3 mt-1">
                {{ gear.name }}
              </div>
              <v-divider />
              <v-avatar size="50" class="mr-3 my-4 samll-image">
                <v-img
                  v-if="gear.image.url"
                  :src="gear.image.url"
                  alt="avatar"
                />
                <v-img v-else :src="defaultImage" contain />
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
                    口コミ数：
                    <span class="font-weight-bold">
                      {{ gear.reviews.length }}
                    </span>
                    <br />
                    買いたい：
                    <span class="font-weight-bold">
                      {{ gear.like_users.length }}
                    </span>
                  </small>
                </div>
                <v-divder />
                <div v-if="login" class="font-weight-bold my-5">
                  <v-btn
                    v-if="add"
                    color="red accent-3 white--text font-weight-bold"
                    @click="deleteMenu"
                  >
                    My Gearsから外す
                  </v-btn>
                  <v-btn
                    v-else
                    color="indigo accent-3 white--text font-weight-bold"
                    @click="addMenu"
                  >
                    My Gearsに追加
                  </v-btn>
                  <v-btn
                    v-if="like"
                    class="mx-5"
                    color="red white--text font-weight-bold"
                    @click="nice"
                  >
                    買いたい解除
                  </v-btn>
                  <v-btn
                    v-else
                    class="mx-5"
                    color="green white--text font-weight-bold"
                    @click="nice"
                  >
                    買いたい!
                  </v-btn>
                  <gear-review-modal v-if="review" :gear="gear" />
                </div>
                <v-divider />
                <div class="my-4">
                  <h2 class="show-info pl-3">商品詳細</h2>
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
                        <span>{{ gear.weight }}g</span>
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
                    <dl class="product-spec-list">
                      <dt class="product-spec-term">発売日</dt>
                      <dd class="product-spec-description">
                        <span>{{ gear.release }}</span>
                      </dd>
                    </dl>
                  </div>
                </div>
              </v-sheet>
            </v-col>
          </v-row>
        </v-sheet>
      </v-card>
      <v-divider class="my-5" />
      <v-card flat>
        <v-row no-getters>
          <v-col cols="12" md="8">
            <v-card flat>
              <h3 class="show-info pl-2 mb-2">
                口コミ<span>（{{ gear.reviews.length }}）</span>
              </h3>
              <template v-if="gear.reviews.length === 0">
                <h4 class="my-5 text-decoration-underline">口コミ募集中！</h4>
                <gear-review-modal v-if="login" :gear="gear" />
              </template>
              <template v-else>
                <gear-review-list :reviews="gear.reviews" />
              </template>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card flat>
              <h3 class="mb-2 pl-2 show-info">カスタマーレビュー</h3>
              <v-card height="300px">作成中</v-card>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </template>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import gearReviewModal from "~/components/GearReviewModal.vue"
import gearReviewList from "~/components/GearReviewList.vue"

export default {
  name: "REALCAMPGEARS",
  components: {
    gearReviewModal,
    gearReviewList,
  },
  data() {
    return {
      loading: false,
      rating: 4.3,
      like: false,
      review: true,
      add: false,
      createDate: "",
      defaultImage: require("@/assets/images/default.png"),
    }
  },
  computed: {
    ...mapGetters({
      gear: "gear/gear",
      user: "auth/loginUser",
      login: "auth/isLoggedIn",
      myGears: "choise/gears",
    }),
    loginUserReview() {
      return this.$store.state.gear.gear
    },
  },
  watch: {
    loginUserReview() {
      // レビューを既に投稿しているユーザーは非表示にする
      if (this.login) {
        this.review = true
        this.gear.reviews.forEach((f) => {
          if (f.user_id === this.user.id) {
            this.review = false
          }
        })
        this.add = false
        this.myGears.forEach((f) => {
          if (f.id === this.gear.id) {
            this.add = true
          }
        })
      }
    },
  },
  created() {
    this.$axios
      .get(`api/v1/gears/${this.$route.params.id}`)
      .then((res) => {
        this.$store.commit("gear/setGear", res.data, { root: true })
      })
      .then(() => {
        // ユーザーがログインしてたらlikeしているか確認
        if (this.login) {
          this.gear.like_users.forEach((f) => {
            if (f.id === this.user.id) {
              this.like = true
            }
          })
          this.add = false
          this.myGears.forEach((f) => {
            if (f.id === this.gear.id) {
              this.add = true
            }
          })
        }
        this.createDate = this.$dayjs(this.gear.created_at).format("YYYY/MM/DD")
        this.loading = true
      })
  },
  methods: {
    ...mapActions({
      likeGear: "gear/likeGear",
      unLikeGear: "gear/unLikeGear",
      addGear: "choise/addGear",
      deleteGear: "choise/deleteGear",
    }),
    nice() {
      const gearData = {
        user: this.user.id,
        gear: this.gear.id,
      }
      if (this.like) {
        this.unLikeGear(gearData).then(() => {
          this.$axios
            .$get(`/api/v1/gears/${this.$route.params.id}`)
            .then((res) => {
              this.$store.commit("gear/setGear", res, { root: true })
              this.like = false
            })
        })
      } else {
        this.likeGear(gearData).then(() => {
          this.$axios
            .$get(`/api/v1/gears/${this.$route.params.id}`)
            .then((res) => {
              this.$store.commit("gear/setGear", res, { root: true })
              this.like = true
            })
        })
      }
    },
    addMenu() {
      this.addGear(this.gear)
      this.add = true
    },
    deleteMenu() {
      this.deleteGear(this.gear)
      this.add = false
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
