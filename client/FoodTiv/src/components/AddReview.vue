<script>
import { useIndexStore } from '../stores';
import { mapState, mapActions } from 'pinia';

export default {
  data() {
    return {
      formData: {
        name: '',
        address: '',
        operationalHours: '',
        phoneAddress: '',
        overview: '',
        latitude: 0,
        longitude: 0,
        user_id: ''
      }
    }
  },
  methods: {
    ...mapActions(useIndexStore, ['getUserProfile', 'addFoodReview']),
    submitForm() {
      this.addFoodReview(this.formData)
    }
  },
  computed: {
    ...mapState(useIndexStore, ['currentUser'])
  },
  async created() {
    await this.getUserProfile()
    this.formData.user_id = this.currentUser.id
  }
}
</script>

<template>
  <div class="w-full flex justify-center items-center">
    <div class="flex flex-col gap-y-5 w-96 border-solid border-2 p-10">
      <h1 class="font-bold text-2xl text-center">Post your review</h1>
      <form @submit.prevent="submitForm" class="w-full">
        <div class="flex flex-col">
          <label class="label">
            <span class="label-text">Restaurant Name</span>
          </label>
          <input v-model="formData.name" type="text" placeholder="Warung sate bang jago"
            class="input input-bordered w-full" />
        </div>
        <div class="flex flex-col">
          <label class="label">
            <span class="label-text">Address</span>
          </label>
          <input v-model="formData.address" type="text" placeholder="Jl. Pondok Indah Raya No. 40, Jakarta Selatan"
            class="input input-bordered w-full" />
        </div>
        <div class="flex flex-col">
          <label class="label">
            <span class="label-text">Operational Hours</span>
          </label>
          <input v-model="formData.operationalHours" type="text" placeholder="10:00 - 18:00"
            class="input input-bordered w-full" />
        </div>
        <div class="flex flex-col">
          <label class="label">
            <span class="label-text">Phone Address</span>
          </label>
          <input v-model="formData.phoneAddress" type="integer" placeholder="08589831023"
            class="input input-bordered w-full" />
        </div>
        <div class="flex flex-col">
          <label class="label">
            <span class="label-text">Overview</span>
          </label>
          <textarea v-model="formData.overview" class="textarea textarea-bordered" placeholder=". . . . ."></textarea>
        </div>
        <div class="flex flex-col">
          <label class="label">
            <span class="label-text">Location Coordinate</span>
          </label>
          <div class="flex gap-2 items-center">
            <input v-model="formData.latitude" type="string" placeholder="latitude" class="input input-bordered w-full" />
            <input v-model="formData.longitude" type="string" placeholder="longitude"
              class="input input-bordered w-full" />
            <label for="my-modal-3">
              <span id="question" class="material-symbols-outlined">
                question_mark
              </span>
            </label>
            <input type="checkbox" id="my-modal-3" class="modal-toggle" />
            <div class="modal">
              <div class="modal-box relative">
                <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                <h3 class="text-lg font-bold">How to get coordinate on Google Maps?</h3>
                <ul>
                  <li>- <a href="https://maps.google.com/" target="_blank"><span class="text-blue-400">Go to Google
                        Maps</span></a></li>
                  <li>- Search your recomendation places</li>
                  <li>- Right click on the red marker</li>
                  <li>- Copy the coornidate</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full flex justify-center">
          <button class="btn bg-slate-700 w-32 mt-5" type="submit">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
#question {
  cursor: pointer;
}
</style>