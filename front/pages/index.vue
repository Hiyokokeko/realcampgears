<template>
  <div style="height: 4000px">
    <h1>HELLO.VUE</h1>
    <template v-if="$store.state.auth.isLoggedIn">
      <p>{{ $store.state.auth.currentUser }}</p>
      <!-- <p>{{$store.state.auth.currentUser.image}}</p> -->
      <v-img :src="$store.state.auth.currentUser.image.url"></v-img>
      <nuxtLink to="/gear/create"> gear投稿ページへ </nuxtLink>
      <!-- <p>{{ imaging }}</p> -->
      <ul v-for="gear in gears" :key="gear.id">
        <li>
          {{ gear }}
          <nuxtLink :to="{ path: `/gear/${gear.id}` }"> 詳細 </nuxtLink>
          <v-img :src="gear.image.url"></v-img>
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
export default {
  auth: false,
  layout: "default",
  data() {
    return {
      gears: [],
      // loading: false
    };
  },
  // methods: {
  //   getMsg () {
  //     this.$axios.$get('/api/v1/hello')
  //       .then(res => this.msgs.push(res))
  //   }
  // }
  created() {
    this.$axios.get("api/v1/gears").then((res) => {
      console.log(res);
      console.log(res.data);
      this.gears = res.data;
      // this.loading = true
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
