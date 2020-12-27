<template>
  <div class="bg-gray-500 h-screen pt-8 relative">
    <div id="nav">
      <router-link to="/" class="text-4xl">Sindico</router-link>
    </div>
    <div class="max-w-xs mx-auto mt-8">
      <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-auto">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Username
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username" type="text" v-model="credentials.email" placeholder="Username">
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password" type="password" v-model="credentials.password"  placeholder="**************">
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="remember">
            <input class="mr-2 leading-tight" type="checkbox" id="remember" v-model="remember">
            <span class="text-sm">
              Remember me
            </span>
          </label>
        </div>
        <div class="flex items-center justify-between"> 
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button" @click="login">
            Sign In
          </button>
          <router-link to="/recover-password" class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
            Forgot Password?
          </router-link>
        </div>
      </div>
      <copy-rights />
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import { mapActions } from 'vuex'

  export default {
    data() {
      return {
        credentials: { email: '', password: ''},
        remember: false 
      }
    },

    methods: {
      ...mapActions(['authenticate']),

      login() {
        let loader = this.$loading.show()

        this.$store.commit('remember', this.remember)

        this.authenticate(this.credentials)
          .then((response) => {
            loader.hide()
            this.$router.push('app')
          })
          .catch((error) => {
            loader.hide()
            this.credentials = { email: '', password: '' }
            this.$toasted.show(error, { type: "error" })
          })
      }
    }
  }
</script>
