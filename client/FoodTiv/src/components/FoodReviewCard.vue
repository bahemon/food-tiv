<script>
import { mapActions, mapWritableState } from 'pinia';
import { useIndexStore } from '../stores';

export default {
  props: ['review'],
  methods: {
    ...mapActions(useIndexStore, ['getFoodReviewDetail', 'getUserProfile']),
    toDetail(id) {
      this.getFoodReviewDetail(id)
    }
  },
  computed: {
    ...mapWritableState(useIndexStore, ['currentUser'])
  },
  async created() {

  }
}
</script>

<template>
  <div @click.prevent="toDetail(review.id)" class="card w-64 h-96 bg-base-100 border-solid border-2">
    <div class="m-2">
      <figure><img class="rounded-md" src="../assets/carousel-1.jpg" alt="Shoes" /></figure>
      <div class="my-5 flex flex-col">
        <h2 class="font-bold">{{ review.name }}</h2>
        <p>{{ review.operationalHours }}</p>
      </div>
      <p>Author: {{ review.User.username }}</p>
    </div>
  </div>
</template>

<style scoped>
.card {
  cursor: pointer;
}
</style>