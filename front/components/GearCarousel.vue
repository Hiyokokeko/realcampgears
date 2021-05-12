<template>
  <div>
    <v-row no-gutters class="mt-10 ml-10 tab" @click="pagelink(links.to)">
      <h3 class="font-weight-bold headline">おすすめ</h3>
      <v-icon right>mdi-chevron-right</v-icon>
    </v-row>
    <v-slide-group class="pa-4" show-arrows>
      <v-slide-item v-for="gear in gears" :key="gear.id">
        <v-hover v-slot="{ hover }">
          <v-card
            class="ma-2"
            height="200px"
            width="200px"
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
                height="130px"
                width="130px"
                contain
                :src="gear.image.url"
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
  data() {
    return {
      links: {
        to: "/users/create",
      },
    };
  },
  props: ["gears"],
  methods: {
    pagelinks(link) {
      this.$router.push({ path: link });
    },
  },
};
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
