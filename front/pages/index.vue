<template>
  <div style="height: 4000px">
    <h1>HELLO.VUE</h1>
    <p>{{ $store.state.auth.currentUser }}</p>
    <p v-if="$store.state.auth.isLoggedIn">
      <nuxtLink to="/gear/create"> ギア投稿ページへ </nuxtLink>
      <ul v-for="gear in gears" :key="gear.id">
        <li>
          {{ gear }}
          <nuxtLink :to="{ path: `/gear/${gear.id}`}">
            詳細
          </nuxtLink>
          <v-img :src="gear.image.url" rel="preload"></v-img>
        </li>
      </ul>
    </p>
  </div>
</template>

<script>
export default {
  auth: false,
  layout: "default",
  data() {
    return {
      gears: [],
    };
  },
  created() {
    this.$axios.get("api/v1/gears").then((res) => {
      console.log(res);
      console.log(res.data);
      this.gears = res.data;
    });
  },
  methods: {},
};
</script>

<style>
h1 {
  font-family: "Fraunces", serif;
}
</style>
