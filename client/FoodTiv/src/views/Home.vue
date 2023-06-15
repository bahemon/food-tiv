<script>
import { useIndexStore } from '../stores';
import { mapActions, mapState } from 'pinia';
import FoodReviewCard from '../components/FoodReviewCard.vue';
import CategoryCard from '../components/CategoryCard.vue';
import PremiumSection from '../components/PremiumSection.vue';
import AddReview from '../components/AddReview.vue';

export default {
  components: {
    FoodReviewCard,
    CategoryCard,
    PremiumSection,
    AddReview
  },
  computed: {
    ...mapState(useIndexStore, ['currentUser', 'foodReviews', 'categories'])
  },
  methods: {
    ...mapActions(useIndexStore, ['getUserProfile', 'getFoodReviewData', 'getCategories'])
  },
  async created() {
    if (localStorage.access_token) {
      await this.getUserProfile()
      // console.log(this.currentUser, '<<<<<<')
    }
    await this.getFoodReviewData()
    await this.getCategories()
  }
}
</script>

<template>
  <div class="w-full flex justify-center">
    <div class="carousel w-full rounded-3xl mx-2">
      <div id="slide1" class="carousel-item relative w-full">
        <img src="../assets/carousel-1.jpg" class="w-full h-96 object-cover" />
      </div>
    </div>

    <div class="flex flex-col justify-center gap-y-2">
      <p class="text-slate-800 text-2xl font-bold">Food Tiv,<br> your hungry partner.</p>
      <p class="text-slate-800">See food reviews from thousand Author's</p>
    </div>
  </div>

  <div class="my-10 text-center">
    <h1 class="font-bold text-2xl m-3">What's good to eat?</h1>
    <p class="font-base text-xl">Discover our collection of food reviews, and enjoy!</p>
  </div>

  <div class="bg-slate-700 flex flex-wrap gap-10 justify-center items-center py-12">
    <FoodReviewCard v-for="review in foodReviews" :key="review.id" :review="review" />
  </div>

  <div class="my-10 text-center">
    <h1 class="font-bold text-2xl m-3">Looking something to eat? Checkout this</h1>
  </div>

  <div class="bg-slate-600 flex flex-wrap justify-center items-center gap-10 py-12">
    <CategoryCard v-for="category in categories" :key="category.id" :category="category" />
  </div>

  <div class="my-10 text-center">
    <h1 class="font-bold text-2xl m-3">Join with others premium Food Tivers now!</h1>
  </div>

  <PremiumSection />

  <div class="my-10 text-center">
    <h1 class="font-bold text-2xl m-3">Start your contribution here</h1>
  </div>

  <AddReview />
</template>

<style></style>