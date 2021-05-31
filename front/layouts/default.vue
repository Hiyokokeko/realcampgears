<template>
  <v-app>
    <the-header @toggle-drawer="$refs.drawer.drawer = !$refs.drawer.drawer" />
    <the-sidebar ref="drawer" />
    <v-main>
      <flash-message />
      <nuxt />
    </v-main>
    <!-- <the-footer /> -->
  </v-app>
</template>

<script>
import theSidebar from "~/components/layouts/TheSidebar.vue"
import theHeader from "~/components/layouts/TheHeader.vue"
// import theFooter from "~/components/layouts/TheFooter.vue"
import flashMessage from "~/components/layouts/FlashMessage.vue"

export default {
  components: {
    theSidebar,
    theHeader,
    // theFooter,
    flashMessage,
  },
}
</script>

<style>
/* v-main {
  background-color: #fbfbfb;
} */
</style>
