<template>
  <v-row>
    <v-col cols="10" md="4" offset="1" offset-md="4">
      <v-card>
        <v-toolbar color="#b4a7d6">Register</v-toolbar>
        <v-card-text>
          <v-scroll-x-transition>
            <v-alert v-if="alertError" dark type="error" outlined>
              <template v-slot:title> Outlined Alert </template>
              {{ $t(errorMessage) }}
            </v-alert>
          </v-scroll-x-transition>
          <v-form ref="form">
            <v-text-field
              label="Name"
              v-model="form.name"
              :rules="rules.name"
              required
            >
            </v-text-field>
            <v-text-field
              @keydown="resetEmailExistNotf"
              label="Email"
              v-model="form.email"
              :rules="rules.email"
              required
            >
            </v-text-field>
            <v-row class="mx-auto">
                 <v-radio-group
                    v-model="form.gender"
                    inline
                    >
                    <v-radio
                        label="Laki-laki"
                        value="laki-laki"
                    ></v-radio>
                    <v-radio
                        label="Perempuan"
                        value="perempuan"
                    ></v-radio>
                </v-radio-group>
            </v-row>
            <v-text-field
              :append-icon="showEyeIcon ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showEyeIcon ? 'text' : 'password'"
              label="Password"
              v-model="form.password"
              :rules="rules.password"
              @click:append="showEyeIcon = !showEyeIcon"
              required
            >
            </v-text-field>
            <v-text-field
              :append-icon="showEyeIcon2 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showEyeIcon2 ? 'text' : 'password'"
              label="Confirm Password"
              :rules="rules.password_confirmation"
              @click:append="showEyeIcon2 = !showEyeIcon2"
              required
            >
            </v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :loading="isLoading" @click="onSubmit" color="#b4a7d6"
            >Register</v-btn
          >
        </v-card-actions>
      </v-card>
      <div class="d-flex align-baseline">
        <p>Kamu sudah punya akun ?</p>
        <v-btn to="/login" text plain :ripple="false" color="primary"
          >Login</v-btn
        >
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
//   middleware: ['unauthenticated'],
  head() {
    return {
      title: 'Form Project',
    }
  },
  data() {
    return {
        selected:"",
        alertError: false,
        isLoading: false,
        emailExist: false,
        showEyeIcon: false,
        showEyeIcon2: false,
        errorMessage: '',
        form: {
            name: '',
            gender : '',
            email: '',
            password: '',
            password_confirmation: '',
        },
        rules: {
            name: [(v) => !!v || this.$t('NAME_IS_REQUIRED')],
            email: [
              (v) => !!v || 'Email is required!',
              (v) =>
                /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(v) ||
                this.$t('EMAIL_IS_NOT_VALID'),
              (v) => !this.emailExist || this.$t('EMAIL_ALREADY_EXIST'),
            ],
            password: [
              (v) => !!v || this.$t('PASSWORD_IS_REQUIRED'),
              (v) => v.length >= 6 || 'Password must be at least 6 characters',
            ],
            password_confirmation: [
              (v) => !!v || 'Password confirmation is required',
              (v) => v === this.form.password || 'Password is not match!',
            ],
        },
    }
  },
  methods: {
    resetEmailExistNotf() {
      this.emailExist = false
    },
    async onSubmit() {
      try {
        if (this.$refs.form.validate()) {
          this.isLoading = true
          let response = await this.$axios.$post(
            'http://localhost:8000/register',
            this.form
          )
          if (response.message == 'USER_REGISTER_SUCCESS') {
            console.log('hAL', response)
            // save access token to cookies
            // save refresh token to cookies
            // this.$router.push('/dashboard');
            this.$store.commit('auth/setEmail', response.email)
            this.$store.commit('auth/setAccessToken', response.accessToken)
            this.$store.commit('auth/setRefreshToken', response.refreshToken)
            this.alertError = false
          }
          this.isLoading = false
        }
      } catch (err) {
        console.log({ err })
        if (err.response.data.message == 'EMAIL_ALREADY_EXIST') {
          this.emailExist = true
          this.alertError = true
          this.errorMessage = err.response
            ? err.response.data.message
            : 'SERVER_ERROR'
          this.$refs.form.validate() // ini akan mengecek apakah di dalam form sudah sesuai atau masih ada data yang tidak sesuai
        }
        this.alertError = true
        this.errorMessage = err.response
          ? err.response.data.message
          : 'SERVER_ERROR'
        this.isLoading = false
      }
    },
  },
}
</script>
