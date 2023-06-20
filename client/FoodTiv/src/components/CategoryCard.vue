<script>
export default {
  props: ['category']
}
</script>

<template>
  <!-- Card Category -->
  <div class="card w-52 h-52 bg-base-100 shadow-xl p-10">
    <figure><img class="w-24" :src="category.iconUrl" alt="Shoes" /></figure>
    <div>
      <h2 class="font-bold text-lg text-center">{{ category.name }}</h2>
    </div>
  </div>
</template>
<style></style>