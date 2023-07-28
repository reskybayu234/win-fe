<template>
  <div class="text-center">
    <v-dialog v-model="dialog" hide-overlay max-width="500px">
      <v-card color="#b4a7d6" dark>
        <v-card-text>
          <p>Logout on progress . . .</p>

          <v-progress-linear indeterminate color="white"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  middleware: ['authentication'],
  data() {
    return {
      dialog: false,
    }
  },
  mounted() {
    this.dialog = true
    setTimeout(() => {
      this.dialog = false
      this.$store.commit('auth/logout')
      this.$router.push({ path: '/login' })
    }, 4000)
  },
}
</script>
