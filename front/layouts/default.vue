<template>
  <v-app>
    <the-header />
    <the-sidebar />
    <v-main>
      <the-side-button />
      <gear-message />
      <flash-message />
      <nuxt />
    </v-main>
    <!-- <the-footer /> -->
  </v-app>
</template>

<script>
import theSidebar from "~/components/layouts/TheSidebar.vue"
import theHeader from "~/components/layouts/TheHeader.vue"
import theSideButton from "~/components/layouts/TheSideButton.vue"
// import theFooter from "~/components/layouts/TheFooter.vue"
import flashMessage from "~/components/layouts/FlashMessage.vue"
import gearMessage from "~/components/layouts/GearMessage.vue"

export default {
  components: {
    theSidebar,
    theHeader,
    theSideButton,
    // theFooter,
    flashMessage,
    gearMessage,
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
