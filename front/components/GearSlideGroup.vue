<template>
  <v-card width="610px" flat>
    <v-list>
      <v-row>
        <v-list-item
          v-for="(gear, i) in gears"
          :key="gear.id"
          :to="{ path: `/gear/${gear.id}` }"
        >
          <v-list-item-avatar>
            <v-img v-if="gear.image.url" contain :src="gear.image.url" />
            <v-img v-else contain :src="defaultImage" />
          </v-list-item-avatar>
          <v-list-item-content :to="{ path: `/gear/${gear.id}` }">
            <v-list-item-title class="list-item">
              {{ i + number }}&emsp;&nbsp;{{ gear.name }}
            </v-list-item-title>
            <v-list-item-subtitle class="ml-6">
              {{ gear.maker }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <gear-card-menu :gear="gear" />
          <v-list-item-icon>
            <v-btn icon color="green" class="mr-5" x-samll to="/gear/create">
              <v-icon> mdi-plus-thick </v-icon>
            </v-btn>
          </v-list-item-icon>
        </v-list-item>
      </v-row>
    </v-list>
  </v-card>
</template>

<script>
import gearCardMenu from "~/components/GearCardMenu.vue"

export default {
  components: {
    gearCardMenu,
  },
  props: {
    gears: {
      type: Array,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      defaultImage: require("@/assets/images/default.png"),
    }
  },
}
</script>

<style scoped>
.tab {
  cursor: pointer;
}
.list-item {
  width: 100px;
}
</style>
