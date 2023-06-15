<script>
import { mapActions, mapState } from 'pinia';
import { useIndexStore } from '../stores';
import Swal from 'sweetalert2/dist/sweetalert2'
import axios from 'axios';

export default {
  data() {
    return {
      menuData: {
        name: '',
        price: 0,
        imageUrl: '',
        category_id: ''
      }
    }
  },
  computed: {
    ...mapState(useIndexStore, ['categories'])
  },
  methods: {
    ...mapActions(useIndexStore, ['getCategories']),
    onSelect(event) {
      const file = event.target.files[0]
      this.menuData.imageUrl = file
    },
    async submitAdd() {
      try {
        const formData = new FormData()
        formData.append('name', this.menuData.name)
        formData.append('price', this.menuData.price)
        formData.append('imageUrl', this.menuData.imageUrl)
        formData.append('category_id', this.menuData.category_id)
        const { data } = await axios({
          method: 'POST',
          url: `https://taboo-snake-production.up.railway.app/restaurantMenus/${this.$route.params.foodReviewId}`,
          headers: {
            access_token: localStorage.access_token,
            "Content-Type": "multipart/form-data"
          },
          data: formData
        })

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Menu added successfully',
          showConfirmButton: false,
          timer: 1500
        })

        this.$router.push(`/foodReviews/${this.$route.params.foodReviewId}`)
      } catch (err) {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.message
        })
      }
    }
  },
  async created() {
    await this.getCategories()
  }
}
</script>

<template>
  <div class="w-full flex justify-center items-center mt-20">
    <div class="flex flex-col gap-y-5 w-96 border-solid border-2 p-10">
      <h1 class="font-bold text-3xl text-center">Post your favorite menu</h1>

      <form @submit.prevent="submitAdd" enctype="multipart/form-data" class="w-full">
        <div class="flex flex-col">
          <label class="label">
            <span class="label-text" name="name">Menu Name</span>
          </label>
          <input v-model="menuData.name" type="text" placeholder="Sate ayam" class="input input-bordered w-full" />
        </div>

        <div class="flex flex-col">
          <label class="label">
            <span class="label-text" name="price">Price</span>
          </label>
          <input v-model="menuData.price" type="number" placeholder="20000" class="input input-bordered w-full" />
        </div>

        <div class="flex flex-col">
          <label class="label">
            <span class="label-text" name="imageUrl">Image Url</span>
          </label>
          <input @change="onSelect" type="file" placeholder=". . . . ." class="input w-full" />
        </div>

        <div class="flex flex-col">
          <label class="label">
            <span class="label-text">Category</span>
          </label>
          <select v-model="menuData.category_id" class="select select-bordered w-full max-w-xs">
            <option disabled selected>Who shot first?</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
          </select>
        </div>

        <div class="w-full flex justify-center">
          <button class="btn bg-slate-700 w-32 mt-5" type="submit">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style></style>