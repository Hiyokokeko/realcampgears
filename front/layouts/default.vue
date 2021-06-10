<template>
  <v-app>
    <the-header />
    <the-sidebar />
    <v-main>
      <the-side-button />
      <flash-message />
      <nuxt />
    </v-main>
    <!-- <the-footer /> -->
  </v-app>
</template>

<script>
import theSidebar from "~/components/layouts/TheSidebar.vue"
import theHeader from "~/components/layouts/TheHeader.vue"
import TheSideButton from "~/components/layouts/TheSideButton.vue"
// import theFooter from "~/components/layouts/TheFooter.vue"
import flashMessage from "~/components/layouts/FlashMessage.vue"

export default {
  components: {
    theSidebar,
    theHeader,
    TheSideButton,
    // theFooter,
    flashMessage,
  },
}
</script>

<style>
/* v-main {
  background-color: #fbfbfb;
} */
.btn {
  position: fixed;
  z-index: 50;
}
</style>
