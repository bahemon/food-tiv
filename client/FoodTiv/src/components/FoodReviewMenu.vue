<script>
export default {
  props: ['menu'],
  created() {
    // console.log(this.menu, "<><><><><><><>")
  }
}
</script>

<template>
  <div class="carousel-item flex flex-col h-96">
    <div>
      <img class="w-64 h-80 object-cover rounded-box" :src="`http://localhost:3000/${menu.imageUrl}`" alt="Burger" />
    </div>
    <div class="mt-2">
      <p class="text-sm font-bold">{{ menu.name }}</p>
      <p class="text-xs text-gray-600">{{ menu.Category.name }}</p>
      <p class="text-sm">{{ menu.price }}</p>
    </div>

  </div>
</template>

<style></style>