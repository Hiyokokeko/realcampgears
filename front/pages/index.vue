<template>
  <div style="height: 4000px">
    <h1>HELLO.VUE</h1>
    <p>{{ $store.state.auth }}</p>
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
