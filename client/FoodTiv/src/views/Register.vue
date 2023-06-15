<script>
import { useIndexStore } from '../stores';
import { mapActions } from 'pinia';
export default {
  data() {
    return {
      registerData: {
        username: '',
        email: '',
        password: '',
        phoneNumber: ''
      }
    }
  },
  methods: {
    ...mapActions(useIndexStore, ['register']),
    submitRegister() {
      this.register(this.registerData)
    }
  }
}
</script>

<template>
  <div class="flex justify-center items-center w-full p-20">
    <div class="flex flex-col gap-y-5 w-96 border-solid border-2 p-10">
      <h1 class="font-bold text-3xl text-center">Register</h1>

      <form @submit.prevent="submitRegister" class="w-full">
        <div class="flex flex-col">
          <label class="label">
            <span class="label-text">Username</span>
          </label>
          <input v-model="registerData.username" type="text" placeholder="jamalTheCamel"
            class="input input-bordered w-full" />
        </div>

        <div class="flex flex-col">
          <label class="label">
            <span class="label-text">Email</span>
          </label>
          <input v-model="registerData.email" type="text" placeholder="jamal@mail.com"
            class="input input-bordered w-full" />
        </div>

        <div class="flex flex-col">
          <label class="label">
            <span class="label-text">Password</span>
          </label>
          <input v-model="registerData.password" type="password" placeholder="*****"
            class="input input-bordered w-full" />
        </div>

        <div class="flex flex-col">
          <label class="label">
            <span class="label-text">Phone Number</span>
          </label>
          <input v-model="registerData.phoneNumber" type="integer" placeholder="0858XXXXXXXX"
            class="input input-bordered w-full" />
        </div>

        <div class="w-full flex items-center justify-center">
          <button type="submit" class="btn bg-slate-700 w-72 mt-5">Register</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style></style>