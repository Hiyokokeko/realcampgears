<template>
  <v-navigation-drawer
    v-model="drawer"
    :clipped="clipped"
    fixed
    stateless
    app
    dark
    max-width="300"
  >
    <v-card
      class="white--text d-flex justify-center font-weight-bold mx-2 mt-1 pa-1"
      color="grey darken-1"
    >
      選択中
    </v-card>
    <v-expansion-panels class="px-2" accordion>
      <v-fade-transition group hide-on-leave>
        <v-expansion-panel v-for="gear in gears" :key="gear.id">
          <v-expansion-panel-header class="d-flex">
            <v-avatar
              size="40"
              class="small-image"
              max-width="40"
              color="white"
            >
              <v-img
                v-if="gear.image.url"
                :src="gear.image.url"
                alt="avatar"
                contain
              />
              <v-img v-else :src="defaultImage" contain />
            </v-avatar>
            <span class="font-weight-bold ml-1">{{ gear.name }}</span>
          </v-expansion-panel-header>
          <div class="d-flex justify-space-around">
            <v-btn
              small
              color="blue white--text"
              class="font-weight-bold"
              :to="{ path: `/gear/${gear.id}` }"
            >
              詳細
            </v-btn>
            <v-btn
              small
              class="font-weight-bold"
              color="red"
              text
              @click="deleteMenu(gear)"
            >
              削除
            </v-btn>
          </div>
          <v-expansion-panel-content class="mt-2">
            <p>重量：{{ gear.weight }}kg</p>
            <p>金額：{{ gear.price }}円</p>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-fade-transition>
    </v-expansion-panels>
    <template #append>
      <div class="mx-2">
        <v-card class="mb-2" color="grey darken-2">
          <v-card-title class="justify-center total font-weight-bold">
            合計
          </v-card-title>
          <v-divider />
          <v-card-text class="total-text">
            <dl class="product-spec-list">
              <dt class="product-spec-term font-weight-bold">重量</dt>
              <dd class="product-spec-description">
                <span class="font-weight-black">{{ weight }}</span>
                <span>kg</span>
              </dd>
            </dl>
            <dl class="product-spec-list">
              <dt class="product-spec-term font-weight-bold">金額</dt>
              <dd class="product-spec-description">
                <span class="font-weight-black">{{ price }}</span>
                <span>円</span>
              </dd>
            </dl>
          </v-card-text>
          <v-card-text class="total d-flex px-1">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="setDay"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="setDay"
                  label="キャンプ日"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                />
              </template>
              <v-date-picker v-model="setDay" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(setDay)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
            <v-select
              v-model="timeNumber"
              item-text="state"
              item-value="number"
              :items="timezone"
              label="時間帯"
              class="time-zone ml-6"
            />
          </v-card-text>
          <v-btn block color="blue" class="font-weight-bold" @click="setMenu">
            My Gearsをセット
          </v-btn>
        </v-card>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

export default {
  data() {
    return {
      clipped: true,
      fixed: false,
      total: 0.0,
      defaultImage: require("@/assets/images/default.png"),
      menu: false,
      today: "",
      setDay: "",
      timeNumber: 2,
      timezone: [
        { state: "朝", number: 0 },
        { state: "昼", number: 1 },
        { state: "夜", number: 2 },
        { state: "深夜", number: 3 },
      ],
      setTimezone: "",
    }
  },
  computed: {
    ...mapGetters({
      drawer: "choise/drawer",
      gears: "choise/gears",
      weight: "choise/weight",
      price: "choise/price",
    }),
  },
  mounted() {
    console.log("aaaa")
    this.today = new Date()
    this.setDay =
      this.today.getFullYear() +
      "-" +
      Number(this.today.getMonth() + 1) +
      "-" +
      this.today.getDate()
  },
  methods: {
    ...mapActions({
      deleteGear: "choise/deleteGear",
    }),
    deleteMenu(gear) {
      this.deleteGear(gear)
    },
    setMenu() {
      switch (this.timeNumber) {
        case 0:
          this.setTimezone = "朝"
          break
        case 1:
          this.setTimezone = "昼"
          break
        case 2:
          this.setTimezone = "夜"
          break
        case 3:
          this.setTimezone = "深夜"
      }
      console.log(this.setTimezone)
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
.total {
  padding: 0;
}
.total-text {
  padding-top: 0;
}
.product-spec-list {
  border-bottom: 1px solid #e7e7e7;
  margin: 0;
}
.product-spec-term {
  display: inline-block;
  vertical-align: top;
  width: 100px;
  font-size: 15px;
  line-height: 16px;
  color: white;
  margin: 12px 0 8px;
}
.product-spec-description {
  display: inline-block;
  vertical-align: top;
  font-size: 15px;
  line-height: 16px;
  letter-spacing: 0.4px;
  color: white;
  font-weight: 400;
  margin: 12px 0 8px;
  white-space: pre-wrap;
}
.time-zone {
  max-width: 85px;
}
</style>
