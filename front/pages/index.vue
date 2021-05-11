<template>
  <div>
    <div class="grey lighten-3 pt-6 px-4">
      <v-container>
        <v-carousel
          height="380"
          width="500"
          show-arrows-on-hover
          hide-delimiter-background
          cycle
          light
        >
          <v-carousel-item
            v-for="(item, index) in headerItems"
            :key="index"
            :to="item.to"
            :ripple="false"
          >
            <v-row no-gutters>
              <v-col cols="7">
                <v-img :src="item.image" height="330"></v-img>
              </v-col>
              <v-col cols="5">
                <v-card
                  height="100%"
                  tile
                  flat
                  class="blue-grey--text text--darken-4 pt-16"
                  :color="color"
                  align="center"
                  :ripple="{ center: true }"
                >
                  <v-card-title class="justify-center pt-13 card-title">
                    {{ item.title }}
                  </v-card-title>
                  <v-card-text class="blue-grey--text text--darken-4 card-text">
                    {{ item.text }}
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-carousel-item>
        </v-carousel>
      </v-container>
    </div>

    <div v-if="loading">
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
      <v-row no-gutters class="mt-10 ml-10 tab" @click="pagelink(links.to)">
        <h3 class="font-weight-bold headline">ランキング</h3>
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
    <v-container>
      <!-- <template v-if="$store.state.auth.isLoggedIn">
        <p>{{ $store.state.auth.currentUser }}</p>
        <p>{{$store.state.auth.currentUser.image}}</p>
        <v-img :src="$store.state.auth.currentUser.image.url"></v-img>
      </template> -->
      <nuxtLink to="/gear/create"> gear投稿ページへ </nuxtLink>
      <!-- <ul v-for="gear in gears" :key="gear.id">
        <li>
          {{ gear }}
          <nuxtLink :to="{ path: `/gear/${gear.id}` }"> 詳細 </nuxtLink>
          <v-img :src="gear.image.url"></v-img>
        </li>
      </ul> -->
    </v-container>
  </div>
</template>

<script>
import Carousel from "vue-carousel/src/Carousel.vue";
import Slide from "vue-carousel/src/Slide.vue";
export default {
  components: {
    Carousel,
    Slide,
  },
  auth: false,
  layout: "default",
  data() {
    return {
      gears: [],
      loading: false,
      color: "white",
      headerItems: [
        {
          image: require("@/assets/images/recommended-image.jpeg"),
          title: "おすすめのギア",
          text: "これからの時期におすすめのギア",
          to: "/topic/Recommended",
        },
        {
          image: require("@/assets/images/manual-image.jpeg"),
          title: "初めて使う方へ",
          text: "REALCAMPGEARSの使い方",
          to: "/manual",
        },
      ],
      links: {
        to: "users/create",
      },
    };
  },
  mounted() {
    this.$axios.get("api/v1/gears").then((res) => {
      console.log(res);
      console.log(res.data);
      this.gears = res.data;
      this.loading = true;
    });
  },
  methods: {
    pagelink(link) {
      this.$router.push({ path: link });
    },
  },
};
</script>
<style>
.card-title {
  font-family: "Noto Sans JP", sans-serif;
  font-size: 30px;
  font-weight: bold;
}
.card-text {
  font-family: "Noto Sans JP", sans-serif;
  font-size: 18px;
}
.gear-title {
  font-size: 17px;
  height: 60px;
  padding: 0px 5px 0px;
}
.tab {
  cursor: pointer;
}
</style>
