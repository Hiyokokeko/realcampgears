<template>
  <div>
    <v-row no-gutters class="mt-10 ml-10 tab" @click="pagelink(links.to)">
      <h3 class="font-weight-bold headline ml-6 mb-3">全体ランキング</h3>
      <v-icon right>mdi-chevron-right</v-icon>
    </v-row>
    <v-sheet max-width="100%" class="mx-10">
      <v-slide-group class="px-5" show-arrows height="300px">
        <gear-slide-group :gears="gears1" :number="a" />
        <gear-slide-group :gears="gears2" :number="b" />
        <gear-slide-group :gears="gears3" :number="c" />
        <gear-slide-group :gears="gears4" :number="d" />
      </v-slide-group>
    </v-sheet>
  </div>
</template>

<script>
import gearSlideGroup from "~/components/GearSlideGroup.vue";
import { mapGetters } from "vuex";

export default {
  layout: "default",

  components: {
    gearSlideGroup,
  },
  data() {
    return {
      gears1: [],
      gears2: [],
      gears3: [],
      gears4: [],
      a: 1,
      b: 11,
      c: 21,
      d: 31,
      links: {
        to: "/users/create",
      },
    };
  },
  mounted() {
    this.gears1 = this.gears.slice(0, 10);
    this.gears2 = this.gears.slice(1, 11);
    this.gears3 = this.gears.slice(0, 10);
    this.gears4 = this.gears.slice(1, 11);
  },
  computed: {
    ...mapGetters({ gears: "gear/gears" }),
  },
  methods: {
    pagelink(link) {
      this.$router.push({ path: link });
    },
  },
};
</script>

<style>
.tab {
  cursor: pointer;
}
.list-item {
  width: 100px;
}
</style>
