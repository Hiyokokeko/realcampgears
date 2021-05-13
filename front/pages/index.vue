<template>
  <div>
    <header-carousel />
    <template v-if="loading">
      <gear-carousel :gears="gears" />
      <gear-ranking />
    </template>
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
import { mapActions, mapGetters } from "vuex";
import headerCarousel from "~/components/HeaderCarousel.vue";
import gearCarousel from "~/components/GearCarousel.vue";
import gearRanking from "~/components/GearRanking.vue";

export default {
  layout: "default",

  components: {
    gearCarousel,
    headerCarousel,
    gearRanking,
  },
  data() {
    return {
      loading: false,
    };
  },
  created() {
    this.getGears().then(() => {
      this.gears1 = this.gears.slice(0, 5);
      this.loading = true;
    });
  },
  computed: {
    ...mapGetters({ gears: "gear/gears" }),
  },
  methods: {
    ...mapActions({ getGears: "gear/getGears" }),
  },
};
</script>

<style>
.tab {
  cursor: pointer;
}
list-item {
  width: 100px;
}
</style>
