<script>
import { mapActions, mapState } from 'pinia'
import { useIndexStore } from '../stores/index'


export default {
  data() {
    return {
      loginData: {
        email: '',
        password: ''
      },
      log: ''
    }
  },
  computed: {
    ...mapState(useIndexStore, [])
  },
  methods: {
    ...mapActions(useIndexStore, ['login', 'googleSignIn']),
    submitLogin() {
      this.login(this.loginData)
    },
    callback(response) {
      this.log = response
      this.googleSignIn(this.log)
    }
  },
  async created() {

  }
}
</script>

<template>
  <div class="flex justify-center items-center w-full p-20">
    <div class="flex flex-col gap-y-5 w-96 border-solid border-2 p-10">
      <h1 class="font-bold text-3xl text-center">Login</h1>
      <form @submit.prevent="submitLogin" class="w-full">
        <div class="flex flex-col">
          <label class="label">
            <span class="label-text">Email</span>
          </label>
          <input v-model="loginData.email" type="text" placeholder="tejo@mail.com" class="input input-bordered w-full" />
        </div>

        <div class="flex flex-col">
          <label class="label">
            <span class="label-text">Password</span>
          </label>
          <input v-model="loginData.password" type="password" placeholder="*****" class="input input-bordered w-full" />
        </div>
        <div class="w-full flex items-center justify-center">
          <button type="submit" class="btn bg-slate-700 w-72 mt-5">Login</button>
        </div>
      </form>

      <!-- Google Login -->
      <div class="flex justify-center">
        <GoogleLogin :callback="callback" prompt />
      </div>

      <!-- Register Link -->
      <p>
        New to FoodTiv?
        <router-link to="/register">
          <span class="text-green-600"><a>Create account</a></span>
        </router-link>
      </p>
    </div>
  </div>
</template>

<style></style>