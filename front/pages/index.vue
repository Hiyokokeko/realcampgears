<template>
  <div style="height: 4000px">
    <h1>HELLO.VUE</h1>
    <p>{{ $store.state.auth.currentUser }}</p>
    <p v-if="$store.state.auth.isLoggedIn">
      <nuxtLink to="/gear/create"> ギア投稿ページへ </nuxtLink>
    </p>
  </div>
</template>

<script>
export default {
  auth: false,
  layout: "default",
  // data() {},
};
</script>

<style>
h1 {
  font-family: "Fraunces", serif;
}
</style>
