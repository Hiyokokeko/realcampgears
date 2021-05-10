<template>
  <div>
    <div class="grey lighten-4 pt-6 px-4">
      <v-container>
        <v-carousel
          height="380"
          width="500"
          show-arrows-on-hover
          hide-delimiter-background
          hide-delimiters
          cycle
        >
          <v-carousel-item
            v-for="(item, index) in headerItems"
            :key="index"
            :to="item.to"
          >
            <v-row no-gutters>
              <v-col cols="8">
                <v-img :src="item.image" height="330"></v-img>
              </v-col>
              <v-col cols="4">
                <v-card
                  height="100%"
                  tile
                  flat
                  class="blue-grey--text text--darken-4 pt-16"
                  :color="color"
                  align="center"
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

    <!-- <h1>HELLO.VUE</h1> -->

    <template v-if="$store.state.auth.isLoggedIn">
      <p>{{ $store.state.auth.currentUser }}</p>
      <!-- <p>{{$store.state.auth.currentUser.image}}</p> -->
      <v-img :src="$store.state.auth.currentUser.image.url"></v-img>
    </template>
    <nuxtLink to="/gear/create"> gear投稿ページへ </nuxtLink>
    <ul v-for="gear in gears" :key="gear.id">
      <li>
        {{ gear }}
        <nuxtLink :to="{ path: `/gear/${gear.id}` }"> 詳細 </nuxtLink>
        <v-img :src="gear.image.url"></v-img>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
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
    };
  },
  created() {
    this.$axios.get("api/v1/gears").then((res) => {
      console.log(res);
      console.log(res.data);
      this.gears = res.data;
      this.loading = true;
    });
  },
  methods: {},
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
</style>
