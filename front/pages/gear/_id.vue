<template>
  <div style="height: 4000px">
    <nuxtLink to="/gear/create"> ギア投稿ページへ </nuxtLink>
    <div v-if="loading">
      <p>{{ gear }}</p>
      <v-img :src="gear.image.url"></v-img>
    </div>
  </div>
</template>

<script>
export default {
  auth: false,
  layout: "default",
  data() {
    return {
      gear: {},
      loading: false,
      image: {},
    };
  },
  created() {
    this.$axios.get(`api/v1/gears/${this.$route.params.id}`).then((res) => {
      this.gear = res.data;
      console.log(res);
      console.log(res.data);
      // this.image = res.data.image.url
      this.loading = true;
    });
  },
  methods: {},
};
</script>

<style>
</style>
