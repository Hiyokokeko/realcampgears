<template>
  <div>
    <v-row no-gutters class="mt-4 ml-16 tab" @click="pagelink(links.to)">
      <h3 class="font-weight-bold headline">おすすめ</h3>
      <v-icon right>mdi-chevron-right</v-icon>
    </v-row>
    <v-slide-group class="px-4 mx-8 pt-2" show-arrows>
      <v-slide-item v-for="gear in gears" :key="gear.id">
        <v-hover v-slot="{ hover }">
          <v-card
            class="ma-2"
            height="200px"
            width="188px"
            :to="{ path: `/gear/${gear.id}` }"
            :elevation="hover ? 12 : 2"
            :class="{ 'on-hover': hover }"
          >
            <div class="grey lighten-2">
              <v-card-title
                class="gear-title overline text-center justify-center"
              >
                {{ gear.name }}
              </v-card-title>
            </div>
            <v-layout class="justify-center mt-2">
              <v-img
                v-if="gear.image.url"
                height="130px"
                width="130px"
                contain
                :src="gear.image.url"
              />
              <v-img
                v-else
                height="130px"
                width="130px"
                contain
                :src="defaultImage"
              />
            </v-layout>
          </v-card>
        </v-hover>
      </v-slide-item>
    </v-slide-group>
  </div>
</template>

<script>
export default {
  props: {
    gears: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      links: {
        to: "/users/create",
      },
      defaultImage: require("@/assets/images/default.png"),
    }
  },
  methods: {
    pagelinks(link) {
      this.$router.push({ path: link })
    },
  },
}
</script>

<style scoped>
.gear-title {
  font-size: 17px;
  height: 60px;
  padding: 0px 5px 0px;
}
.tab {
  cursor: pointer;
}
</style>
