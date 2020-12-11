<template>
  <section class="section section-shaped section-lg my-0 login-page">
    <div class="shape shape-style-1 bg-gradient-default">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="container pt-lg-md">
      <div class="row justify-content-center">
        <div class="col-lg-5">
          <card type="secondary" shadow
                header-classes="bg-white pb-5"
                body-classes="px-lg-5 py-lg-5"
                class="border-0">
            <template>
              <div class="text-center text-muted mb-4">
                <h4>User Login</h4>
              </div>

              <ValidationObserver ref="form" v-slot="{ handleSubmit }">
                <form role="form" @submit.prevent="handleSubmit(onSubmit)">
                  <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
                    <div class="input-wrapper mb-3">
                      <base-input
                          alternative
                          class="mb-0"
                          type="email"
                          placeholder="Email"
                          v-model="email"
                          addon-left-icon="ni ni-email-83">
                      </base-input>
                      <span class="validation-error-message">{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>

                  <ValidationProvider name="password" rules="required" v-slot="{ errors }">
                    <div class="input-wrapper mb-3">
                      <base-input
                          alternative
                          class="mb-0"
                          type="password"
                          placeholder="Password"
                          v-model="password"
                          addon-left-icon="ni ni-lock-circle-open">
                      </base-input>
                      <span class="validation-error-message">{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>

                  <div class="text-center">
                    <button type="submit" class="btn mt-4 float-right btn-primary">Sign In</button>
                  </div>
                </form>
              </ValidationObserver>
            </template>
          </card>
        </div>
      </div>
    </div>
  </section>
</template>
<script>

import apiConfig from '@/config/api.js'
import auth from '@/core/auth.js'
import {mapFields} from "@/helpers.js"
import moduleLogin from '@/store/public/login/moduleLogin.js'
import moduleAuth from '@/store/auth/moduleAuth.js'

export default {
  computed: {
    ...mapFields({
      fields: ["email", "password"],
      moduleKey: 'login',
      getter: 'inputValues',
      mutation: "setInputValue"
    })
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('login/userLogin')
          .then(
              response => {
                auth.setAuthToken(response.data.data.token);

                this.$store.dispatch('auth/fetchAndStoreProfileDetails')

                .then(
                    () => {
                      this.$router.push({ name: 'car.in-stock' })
                    }
                );
              },

              /**
               * @todo create common service/function to show common errors
               * @param error
               */
              error => {
                switch (error.status) {
                  case apiConfig.CODES.HTTP_UNPROCESSABLE_ENTITY: {
                    this.$refs.form.setErrors(error.data.data);
                  }
                    break;

                  case apiConfig.CODES.HTTP_UNAUTHORIZED: {
                    if (error.data.message == null)
                      this.showErrorMessage("Unauthorized!!");
                    else
                      this.showErrorMessage(error.data.message);
                  }
                    break;

                  case apiConfig.CODES.HTTP_TOO_MANY_REQUESTS: {
                    if (error.data.message == null)
                      this.showErrorMessage("Too Many Requests");
                    else
                      this.showErrorMessage(error.data.message);
                  }
                    break;
                }
              }
          );
    },
    showErrorMessage(message) {
      alert(message); // notifier plugin can be replaced here.
    },
    resetForm() {
      this.$store.commit('login/setInputValue', { name: 'email', value: ''});
      this.$store.commit('login/setInputValue', { name: 'password', value: ''});
    }
  },
  created() {
    this.$store.registerModule('auth', moduleAuth)
    this.$store.registerModule('login', moduleLogin)
  },
  destroyed() {
    this.resetForm();
    this.$store.unregisterModule('auth')
    this.$store.unregisterModule('login')
  }
}

</script>

<style lang="scss">

.login-page {
  height: 100vh;

  .validation-error-message {
    color: #bd081c;
    font-size: 11px;
  }
}
</style>
