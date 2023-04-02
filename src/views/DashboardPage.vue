<template>
  <div class="main">
    <div class="header">
    </div>
  </div>
</template>

<script>
import Button from 'primevue/button'
export default {
  components: {
    Button
  },
  methods: {
    handleLogout() {
      this.$store.dispatch('LOGOUT', {
        onSuccess: () => {
          this.$router.push({ name: 'login' })
          
        },
        onFail: (error) => {
          console.log(error)
        }
      })
    }
  }
}
</script>
<style scoped>

</style>
