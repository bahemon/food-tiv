<script>
import { useIndexStore } from '../stores';
import { mapActions, mapWritableState } from 'pinia';

export default {
  data() {
    return {

    }
  },
  computed: {
    ...mapWritableState(useIndexStore, ['isLogin'])
  },
  methods: {
    ...mapActions(useIndexStore, ['getUserProfile', 'logout']),
    submitLogout() {
      this.logout()
    }
  },
  async created() {
    if (localStorage.access_token) {
      this.isLogin = true
    }
  }
}
</script>

<template>
  <div class="navbar bg-base-100 fixed top-0 left-0 right-0 z-50">
    <div class="flex-1">
      <div class="flex-none">
        <ul class="menu menu-horizontal px-1">
          <router-link to="/">
            <li><a>Home</a></li>
          </router-link>

          <div v-if="!isLogin">
            <router-link to="/login">
              <li><a>Sign in</a></li>
            </router-link>
          </div>

          <div v-if="isLogin">
            <li><a @click.prevent="submitLogout">Sign out</a></li>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<style></style>