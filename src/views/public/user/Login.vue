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
              <form role="form">
                <base-input
                    alternative
                    class="mb-3"
                    placeholder="Email"
                    addon-left-icon="ni ni-email-83">
                </base-input>
                <base-input
                    alternative
                    type="password"
                    placeholder="Password"
                    addon-left-icon="ni ni-lock-circle-open">
                </base-input>
                <div class="text-center">
                  <base-button type="primary" class="my-4" id="sign-in-btn">Sign In</base-button>
                </div>
              </form>
            </template>
          </card>
          <div class="row mt-3">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {};
</script>

<style lang="scss">
.login-page {
  height: 100vh;
}
</style>