<template>
  <v-dialog v-model="dialog" max-width="600">
    <template #activator="{ on, attrs }">
      <v-btn
        color="orange white--text font-weight-bold"
        v-bind="attrs"
        v-on="on"
      >
        評価・口コミをする
      </v-btn>
    </template>

    <v-card>
      <v-system-bar lights-out>
        <v-spacer></v-spacer>
        <v-btn icon class="mt-5" @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-system-bar>
      <v-card-title class="headline justify-center">
        {{ gear.name }}
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-container>
            <div class="d-flex align-center my-2">
              <span class="font-weight-bold"> 総合評価 </span>
              <v-rating
                v-model="review.rate"
                background-color="orange lighten-1"
                color="orange darken-2"
                half-increments
                class="ml-5"
                dense
                large
                hover
              />
              <span class="ml-5 font-weight-bold">
                {{ review.rate }}
              </span>
            </div>
            <v-text-field
              v-model="review.title"
              label="タイトルを入れてください"
            />
            <v-textarea
              v-model="review.content"
              label="口コミ本文をいれてください"
            />
            <v-file-input
              accept="image/png, image/jpeg, image/bmp"
              label="画像"
              show-size
              @change="setImage"
            />
            <v-img
              v-if="review.image"
              :src="input_image"
              contain
              max-width="600"
              max-height="300"
            />
          </v-container>
          <v-card-actions>
            <v-btn
              color="light-green darken-1"
              class="white--text font-weight-bold pa-5 mt-3"
              block
              @click="postReview"
            >
              新規投稿
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex"

export default {
  props: {
    gear: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dialog: false,
      review: {
        title: "",
        content: "",
        rate: 0,
        image: "",
        user_id: this.$store.state.auth.loginUser.id,
        gear_id: this.gear.id,
      },
      input_image: "",
    }
  },
  computed: {},
  methods: {
    ...mapActions({ reviewGear: "gear/review" }),
    postReview() {
      this.reviewGear(this.review)
      this.dialog = false
    },
    setImage(file) {
      this.review.image = file
      console.log(this.review.image)
      if (file !== undefined && file !== null) {
        if (file.name.lastIndexOf(".") <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(file)
        fr.addEventListener("load", () => {
          this.input_image = fr.result
        })
      } else {
        this.input_image = ""
      }
    },
  },
}
</script>

<style scoped>
.signup-link {
  color: #2196f3;
  cursor: pointer;
}
.signup-link:hover {
  opacity: 0.8;
  text-decoration: underline;
}
</style>
