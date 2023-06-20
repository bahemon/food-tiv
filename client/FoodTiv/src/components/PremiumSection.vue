<script>
import { useIndexStore } from '../stores/index'
import { mapActions, mapState } from 'pinia'
export default {
  methods: {
    ...mapActions(useIndexStore, ['upgradeToPremium', 'getUserProfile']),
    async toPremiumButton() {
      this.upgradeToPremium()
    }
  },
  computed: {
    ...mapState(useIndexStore, ['currentUser'])
  },
  async created() {
    await this.getUserProfile()
  }
}
</script>

<template>
  <div class="mx-16 bg-slate-700 text-justify p-6 h-96 gap-4 flex flex-col justify-center items-center rounded-lg">
    <h1 class="font-bold text-3xl text-slate-100">Access FoodTiv anywhere, anytime, with no limit.</h1>
    <h3 class="text-md text-slate-100">Enjoy a large variety of deals and member-only features in FoodTiv
      app.</h3>
    <button @click.prevent="toPremiumButton" class="btn w-52">Click here to join</button>
  </div>
</template>

<style></style>