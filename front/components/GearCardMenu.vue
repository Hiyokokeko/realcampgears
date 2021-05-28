<template>
  <v-menu
    v-model="menu"
    transition="slide-y-transition"
    min-width="200px"
    max-width="350px"
    rounded
    offset-x
    internal-activator
    left
  >
    <template #activator="{ on, attrs }">
      <v-btn icon text color="grey" v-bind="attrs" :ripple="false" v-on="on">
        <v-icon v-on="on"> mdi-dots-horizontal </v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-list-item two-line :to="{ path: `/gear/${gear.id}` }">
        <v-list-item-avatar>
          <v-img :src="gear.image.url" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            {{ gear.name }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ gear.maker }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider />
      <div class="text-center">
        <v-btn v-if="like" block depressed text class="py-6" @click="nice">
          買いたいから解除
        </v-btn>
        <v-btn v-else block depressed text class="py-6" @click="nice">
          買いたい
        </v-btn>
        <v-divider />
        <v-btn
          block
          depressed
          text
          :to="{ path: `/gear/${gear.id}` }"
          class="py-6"
        >
          My Gearsに追加
        </v-btn>
        <v-divider />
      </div>
    </v-card>
  </v-menu>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
export default {
  props: {
    gear: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      defaultImage: "http://localhost:3000/fallback/default.png",
      menu: false,
      liking: [],
      like: false,
      users: this.gear.like_users,
    }
  },
  computed: {
    ...mapGetters({
      user: "user/user",
      loginUser: "user/loginUser",
      currentUser: "auth/currentUser",
    }),
  },
  beforeUpdate() {
    this.like = false
    this.liking = []
    this.loginUser.gearlike.forEach((gear) => {
      if (gear.name === this.gear.name) {
        this.liking.push(gear.name)
      }
    })
    console.log(this.liking)
    // console.log(this.gear.name)
    if (this.liking[0] === this.gear.name) {
      this.like = true
    } else {
      this.like = false
    }
    console.log(this.like)
  },
  methods: {
    ...mapActions({
      likeGear: "gear/likeGear",
      unLikeGear: "gear/unLikeGear",
    }),
    nice() {
      const gearData = {
        user: this.loginUser.id,
        gear: this.gear.id,
      }
      if (this.like) {
        this.unLikeGear(gearData).then(() => {
          this.like = false
          console.log(this.like)
        })
      } else {
        this.likeGear(gearData).then(() => {
          console.log(this.like)
        })
      }
    },
    pagelink(link) {
      this.$router.push({ path: link })
    },
  },
  // dolike() {
  //   this.like = false
  //   this.liking = []
  //   this.loginUser.gearlike.forEach((gear) => {
  //     if (gear.name === this.gear.name) {
  //       this.liking.push(gear.name)
  //     }
  //   })
  //   console.log(this.liking)
  //   console.log(this.gear.name)
  //   if (this.liking[0] == this.gear.name) {
  //     this.like = true
  //   } else {
  //     this.like = false
  //   }
  //   console.log(this.like)
  // },
}
</script>
