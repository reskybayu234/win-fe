<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col cols="10" md="4">
        <v-card>
          <v-toolbar color="#1d5d9b">Login</v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field v-model="form.email" label="Email" required>
              </v-text-field>
              <v-text-field
                @keydown="resetErrorNotif"
                :append-icon="showEyeIcon ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showEyeIcon ? 'text' : 'password'"
                label="Password"
                v-model="form.password"
                @click:append="showEyeIcon = !showEyeIcon"
                required
              >
              </v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :loading="isLoading" @click="onSubmit" color="#1d5d9b"
              >Login</v-btn
            >
          </v-card-actions>
        </v-card>
        <div class="d-flex align-baseline">
          <p>Kamu belum punya akun ?</p>
          <v-btn to="/register" text plain :ripple="false" color="primary"
            >Register</v-btn
          >
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      alertError: false,
      errorMessage: '',
      isLoading: false,
      showEyeIcon: false,
      showEyeIcon2: false,
      form: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    ...mapActions({
      amb: 'auth/login',
    }),
    resetErrorNotif() {
    //   this.alertError = false
    },
    onSubmit() {
      this.$store
        .dispatch('auth/login', this.form)
        .then((res) => {
          console.log('res', res)
          this.alertError = false
          this.$router.push({ path: '/' })
        })
        .catch((err) => {
          this.alertError = true
          console.log({ err })
          this.errorMessage = err.response
            ? err.response.data.message
            : 'SERVER_ERROR'
        })
    },
  },
}
</script>
