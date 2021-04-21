<template>
  <v-app style="height: 4000px">
    <h1>HELLO.VUE</h1>
    <p>{{ $store.state.user.current_user }}</p>
  </v-app>
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
