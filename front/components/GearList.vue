<template>
  <v-card max-width="800px" flat>
    <v-list>
      <v-row>
        <v-list-item
          v-for="gear in gears"
          :key="gear.id"
          :ripple="false"
          class="list"
        >
          <v-list-item-avatar>
            <v-img v-if="gear.image.url" contain :src="gear.image.url" />
            <v-img v-else contain :src="defaultImage" />
          </v-list-item-avatar>
          <v-list-item-title
            :to="{ path: `/gear/${gear.id}` }"
            class="list-item"
          >
            {{ gear.name }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ gear.maker }}
          </v-list-item-subtitle>
          <gear-card-menu :gear="gear" />
          <v-list-item-action>
            <v-btn icon color="green" class="mr-5" x-small>
              <v-icon> mdi-plus-thick </v-icon>
            </v-btn>
          </v-list-item-action>
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
  cursor: pointer;
}
.list:hover {
  transition: 0.3s;
  background-color: #f5f5f5;
}
.list {
  cursor: default;
}
</style>
