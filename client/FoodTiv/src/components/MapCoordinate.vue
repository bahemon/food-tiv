<script>
import { Loader } from "@googlemaps/js-api-loader";
import { mapActions, mapState } from 'pinia';
import { useIndexStore } from '../stores';

export default {
  props: ['foodReviewId'],
  methods: {
    ...mapActions(useIndexStore, ['getFoodReviewDetail', 'getRestaurantMenu']),
    renderMap(lat, lng) {
      const center = { lat, lng };
      const zoom = 14;
      const url = "https://maps.googleapis.com/maps/api/staticmap";
      const loader = new Loader({
        apiKey: "AIzaSyDTplJkHQZ6uGRzIJxpPOpFddUsBpT04VU",
        version: "weekly",
      });

      loader.load().then(() => {
        const map = new google.maps.Map(document.getElementById("map"), {
          center,
          zoom,
        });
        new google.maps.Marker({
          position: center,
          map
        });
      });
    }
  },
  computed: {
    ...mapState(useIndexStore, ['foodReviewToShow', 'restaurantMenuToShow'])
  },
  async created() {
    console.log(this.foodReviewId, "<<<<<<<<<<<><><><")
    await this.getFoodReviewDetail(this.foodReviewId)
    this.renderMap(+this.foodReviewToShow.latitude, +this.foodReviewToShow.longitude)
  }
}
</script>

<template>
  <div id="map"></div>
</template>

<style></style>