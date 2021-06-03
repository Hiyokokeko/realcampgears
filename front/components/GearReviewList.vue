<template>
  <v-card flat>
    <v-list>
      <v-card v-for="review in reviews" :key="review.id" flat class="mb-2">
        <gear-review :review="review" />
      </v-card>
    </v-list>
  </v-card>
</template>

<script>
import gearReview from "~/components/GearReview.vue"

export default {
  components: {
    gearReview,
  },
  props: {
    reviews: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style scoped></style>
