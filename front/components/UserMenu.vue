<template>
  <v-card v-if="status" class="pa-2">
    <div class="d-flex align-center mb-2 ml-2">
      <span class="title">{{ eatDate }}</span>
      <span class="title ml-10">{{ menu.timezone }}</span>
    </div>
    <v-divider />
    <gear-list :gears="menu.choise_gear" class="mb-1" />
    <v-divider />
    <div class="d-flex align-center my-2">
      <div class="body-1 ml-2">
        重量
        <span class="font-weight-bold">{{ totalWeight }}</span>
        g
      </div>
      <div class="body-2 ml-16">
        金額
        <span class="font-weight-bold">{{ totalPrice }}</span>
        円
      </div>
      <v-spacer />
      <div v-if="menu.user_id === $store.state.auth.loginUser.id">
        <v-btn
          color="red"
          class="font-weight-bold justify-center mr-2"
          text
          @click="deleteMenu(menu.id)"
        >
          削除
        </v-btn>
      </div>
    </div>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex"
import gearList from "~/components/GearList.vue"
export default {
  components: {
    gearList,
  },
  props: {
    menu: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      defaultImage: require("@/assets/images/default.png"),
      gears: this.menu.choise_gear,
      status: true,
      eatDate: "",
      totalWeight: 0,
      totalPrice: 0.0,
    }
  },
  computed: {
    ...mapGetters({
      loginUser: "auth/loginUser",
      login: "auth/isLoggedIn",
    }),
  },
  mounted() {
    this.eatDate = this.$dayjs(this.menu.date).format("YYYY/MM/DD")
    let weight = 0
    let price = 0
    this.gears.forEach((gear) => {
      weight += gear.weight
      price += gear.price
    })
    console.log(this.totalWeight)
    this.totalWeight = weight
    this.totalPrice = price.toFixed(1)
  },
  methods: {
    deleteMenu(id) {
      this.$axios
        .delete(`api/v1/menus/${id}`)
        .then(() => {
          this.$store.dispatch(
            "flashMessage/showMessage",
            {
              message: "My Gearsを削除しました。",
              type: "info",
              status: true,
            },
            { root: true }
          )
          this.$axios
            .$get(`/api/v1/users/${this.$route.params.id}`)
            .then((res) => {
              this.$store.commit("user/setUser", res, { root: true })
              this.status = false
            })
        })
        .catch((err) => {
          console.log(err)
          this.$store.dispatch(
            "flashMessage/showMessage",
            {
              message: "My Gearsの削除に失敗しました。",
              type: "error",
              status: true,
            },
            { root: true }
          )
        })
    },
  },
}
</script>

<style scoped></style>
