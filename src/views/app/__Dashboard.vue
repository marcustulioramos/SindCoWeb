<template>
  <div class="flex h-screen bg-white">
    <sidebar/>
    <div class="flex flex-1 flex-col h-screen overflow-y-hidden">
      <header_main class="flex items-center px-5 justify-between border-b border-gray-400 h-12"/>
      <div class="mb-auto overflow-y-hidden flex-1">
        <router-view class="p-3 overflow-x-hidden"/>
      </div>
      <footer_main class="flex items-center px-5 bg-gray-300 justify-between h-10"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapMutations } from 'vuex'

export default {
  mounted() {
    this.$toasted.show("Wellcome", { type: "success" })
  },

  computed: {
    ...mapState(['apiUrl', 'authUser', 'apiToken'])
  },

  methods: {
    ...mapMutations(['setAuthUser', 'setAuthUser']),

    proceedLogout() {
      let loader = this.$loading.show()

      setTimeout(() => {          
        this.$store.commit('endApplication')
        this.$router.push('/')
        loader.hide()
      }, 2000);
    },

    logoutEveryWhere() {
      axios.post(`${this.apiUrl}/logout`, {'api_token': this.apiToken})
           .then(r => this.proceedLogout())
           .catch(e => console.log(e))
    },

    showLoading() {
      this.$store.dispatch('showLoading')
    }
  }
}
</script>
