<template>
  <v-app>
    <the-header @toggle-drawer="$refs.drawer.drawer = !$refs.drawer.drawer" />
    <the-sidebar ref="drawer" />
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <the-footer />
  </v-app>
</template>

<script>
import theSidebar from "~/components/layouts/TheSidebar.vue";
import theHeader from "~/components/layouts/TheHeader.vue";
import theFooter from "~/components/layouts/TheFooter.vue";

export default {
  components: {
    theSidebar,
    theHeader,
    theFooter,
  },
  data() {},
};
</script>
