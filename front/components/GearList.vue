<template>
  <v-card max-width="800px" flat>
    <v-list>
      <v-row>
        <v-list-item
          v-for="gear in gears"
          :key="gear.id"
          :to="{ path: `/gear/${gear.id}` }"
        >
          <v-list-item-avatar>
            <v-img contain :src="gear.image.url" />
          </v-list-item-avatar>
          <v-list-item-content :to="{ path: `/gear/${gear.id}` }">
            <v-list-item-title class="list-item">
              {{ gear.name }}
            </v-list-item-title>
            <v-list-item-subtitle class="ml-6">
              {{ gear.maker }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-icon>
            <v-btn icon color="green" class="mr-5" x-small to="/gear/create">
              <v-icon> mdi-plus-thick </v-icon>
            </v-btn>
            <v-btn icon color="grey" class="mr-16" x-small to="/gear/create">
              <v-icon> mdi-dots-horizontal </v-icon>
            </v-btn>
          </v-list-item-icon>
        </v-list-item>
      </v-row>
    </v-list>
  </v-card>
</template>

<script>
export default {
  props: {
    gears: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style>
.tab {
  cursor: pointer;
}
.list-item {
  width: 100px;
}
</style>
