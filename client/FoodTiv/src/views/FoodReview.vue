<script>
import { mapActions, mapState } from 'pinia';
import { useIndexStore } from '../stores';
import FoodReviewMenu from '../components/FoodReviewMenu.vue';
import MapCoordinate from '../components/MapCoordinate.vue';
import AddMenuForm from './AddMenuForm.vue';

export default {
  components: {
    FoodReviewMenu,
    MapCoordinate,
    AddMenuForm
  },
  data() {
    return {
      avgCost: 0
    }
  },
  methods: {
    ...mapActions(useIndexStore, ['getFoodReviewDetail', 'getRestaurantMenu', 'getUserProfile', 'deleteFoodReview']),
    async averageCost() {
      if (this.restaurantMenuToShow.length !== 0) {
        await this.restaurantMenuToShow.forEach(menu => {
          this.avgCost += menu.price
        })
        this.avgCost /= this.restaurantMenuToShow.length
      }
    },
    deleteButton(data) {
      this.deleteFoodReview(data.id)
    },
    addMenuButton() {
      this.$router.push(`/foodReviews/${this.$route.params.id}/addMenu`)
    }
  },
  computed: {
    ...mapState(useIndexStore, ['foodReviewToShow', 'restaurantMenuToShow', 'currentUser']),
  },
  async created() {
    await this.getFoodReviewDetail(this.$route.params.id)
    await this.getRestaurantMenu(this.$route.params.id)
    await this.getUserProfile()
    await this.averageCost()
    // console.log(this.currentUser, "<><><> current user")
  }
}
</script>

<template>
  <div class="flex flex-col justify-center items-center">
    <div class="carousel w-full rounded-3xl mx-2">
      <div id="slide1" class="carousel-item relative w-full">
        <img src="../assets/carousel-1.jpg" class="w-full h-96 object-cover" />
      </div>
    </div>

    <div class="flex justify-start gap-10 w-11/12 text-left mb-5 mt-2">
      <div class="flex flex-col">
        <h1 class="font-bold">{{ foodReviewToShow.name }}</h1>
        <h3>{{ foodReviewToShow.address }}</h3>
        <h3>{{ foodReviewToShow.operationalHours }}</h3>
      </div>
      <div class="flex justify-center items-center gap-10">
        <button v-if="currentUser.id === foodReviewToShow.user_id" @click.prevent="deleteButton(foodReviewToShow)"
          class="btn btn-error">
          Delete
        </button>
        <button @click.prevent="addMenuButton" class="btn btn-error">
          Add Menu
        </button>
      </div>
    </div>

    <!-- Food Review Overview -->
    <div class="flex m-5 justify-between gap-20 w-11/12 border-2 p-3 rounded-md">
      <div class="flex flex-col mr-10">
        <div class="mb-5">
          <h1 class="text-lg font-bold">About This Place</h1>
          <p class="text-justify">{{ foodReviewToShow.overview }}</p>
        </div>

        <div class="mb-5">
          <h1 class="text-lg font-bold">Cuisines</h1>
          <span v-for="menu in restaurantMenuToShow" :key="menu.id">{{ menu.Category.name + ', ' }}</span>
        </div>

        <div class="mb-5">
          <h1 class="text-lg font-bold">Average Cost</h1>
          <p>{{ avgCost }}</p>
        </div>

        <div class="mb-5">
          <h1 class="text-lg font-bold">Call</h1>
          <p>{{ foodReviewToShow.phoneAddress }}</p>
        </div>
      </div>

      <div class="flex flex-col justify-center items-center rounded-lg">
        <MapCoordinate :foodReviewId="`${this.$route.params.id}`" />
        <div class="w-full">
          <p class="mb-5 text-right text-green-700">Thread Author's : {{ foodReviewToShow.User.username }}</p>
        </div>
      </div>

    </div>

    <!-- Food Review Menus  -->
    <div v-if="restaurantMenuToShow.length !== 0" class="carousel carousel-center max-w-6xl p-4 space-x-4 rounded-box">
      <FoodReviewMenu v-for="menu in restaurantMenuToShow" :key="menu.id" :menu="menu" />
    </div>
  </div>
</template>

<style></style>