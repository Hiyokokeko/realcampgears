<template>
  <v-menu
    :key="login"
    v-model="menu"
    transition="slide-x-reverse-transition"
    min-width="200px"
    max-width="350px"
    rounded
    offset-x
    internal-activator
    left
  >
    <template #activator="{ on, attrs }">
      <template v-if="like">
        <v-btn v-bind="attrs" icon text :ripple="false" v-on="on">
          <v-icon color="red" v-on="on"> mdi-heart </v-icon>
        </v-btn>
      </template>
      <template v-else>
        <v-btn v-bind="attrs" icon text color="grey" :ripple="false" v-on="on">
          <v-icon v-on="on"> mdi-dots-horizontal </v-icon>
        </v-btn>
      </template>
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
        <template v-if="login">
          <v-btn v-if="like" block depressed text class="py-6" @click="nice">
            買いたいから解除
          </v-btn>
          <v-btn v-else block depressed text class="py-6" @click="nice">
            買いたい！
          </v-btn>
        </template>
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
      like: Boolean,
      users: this.gear.like_users,
    }
  },
  computed: {
    ...mapGetters({
      user: "user/user",
      loginUser: "auth/loginUser",
      currentUser: "auth/currentUser",
      login: "auth/isLoggedIn",
    }),
    update() {
      return this.$store.state.auth.isLoggedIn
    },
  },
  watch: {
    update() {
      if (this.login) {
        this.loginUser.gearlike.forEach((gear) => {
          if (gear.name === this.gear.name) {
            this.liking.push(gear.name)
          }
        })
        if (this.liking[0] === this.gear.name) {
          this.like = true
        } else {
          this.like = false
        }
      } else {
        this.like = false
      }
    },
  },
  created() {
    if (this.login) {
      this.loginUser.gearlike.forEach((gear) => {
        if (gear.name === this.gear.name) {
          this.liking.push(gear.name)
        }
      })
      if (this.liking[0] === this.gear.name) {
        this.like = true
      } else {
        this.like = false
      }
    } else {
      this.like = false
    }
  },
  // beforeUpdate() {
  //   if (this.login) {
  //     this.liking = []
  //     this.loginUser.gearlike.forEach((gear) => {
  //       if (gear.name === this.gear.name) {
  //         this.liking.push(gear.name)
  //       }
  //     })
  //     if (this.liking[0] === this.gear.name) {
  //       this.like = true
  //     } else {
  //       this.like = false
  //     }
  //   } else {
  //     this.like = false
  //   }
  // },
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
        })
      } else {
        this.likeGear(gearData).then(() => {
          console.log(this.like)
          this.like = false
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
