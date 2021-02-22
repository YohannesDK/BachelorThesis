<template>
  <main class="d-flex align-items-center min-vh-100 py-3 py-md-0">
    <div class="container login-card-col">
      <div class="card login-card">
        <div class="row no-gutters">
          <div class="col-md-5 position-relative login-img-col">
            <img src="../assets/login.jpg" alt="login" class="login-card-img" />
          </div>
          <div class="col-md-7 login-card-form-col">
            <div class="card-body">
              <div class="brand-wrapper">
                <img src="../assets/brand.svg" alt="logo" class="logo" />
              </div>
              <p class="login-card-description">Sign into your account</p>
              <form @submit.prevent="login()">
                <div class="form-group">
                  <input
                    type="text"
                    name="username"
                    v-model="username"
                    id="username"
                    class="form-control"
                    placeholder="Username"
                    required
                  />
                </div>
                <div class="form-group mb-4">
                  <input
                    type="password"
                    name="password"
                    v-model="password"
                    id="password"
                    class="form-control"
                    placeholder="password"
                    required
                  />
                </div>
                <input
                  name="login"
                  id="login"
                  class="btn btn-block login-btn mb-4"
                  type="submit"
                  value="Login"
                />
              </form>
              <a href="#!" class="forgot-password-link">Forgot password?</a>
              <p class="login-card-footer-text">
                Don't have an account?
                <a href="/register" class="text-reset">Register here</a>
              </p>
              <nav class="login-card-footer-nav">
                <a href="#!">Terms of use.</a>
                <a href="#!">Privacy policy</a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { checkLogin } from "@/services/api/login.service";
import router from "@/router";
export default defineComponent({
  name: "Login",
  setup() {
    const store = useStore();
    const username = ref<string>("");
    const password = ref<string>("");

    // Login function
    const login = () => {
      const form = {
        username: username.value,
        password: password.value
      };
      const user = checkLogin(form);
      console.log(user);

      if (user.length) {
        store.dispatch("login");
        store.dispatch("setUser", user);
        router.push({ path: "/home" });
      }
    };
    return {
      username,
      password,
      login
    };
  }
});
</script>

<style scoped>
/* TODO: make login form responsive */
.container {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}

.login-card-col {
  height: 65vh;
  width: 55%;
}
.login-card {
  border: 0;
  border-radius: 27.5px;
  box-shadow: 0 10px 30px 0 rgb(172 168 168 / 43%);
  overflow: hidden;
  height: 100%;
  width: 100%;
}

.login-img-col {
  width: 41%;
}

.login-card > .row {
  height: 100%;
}

.no-gutters > .col,
.no-gutters > [class*="col-"] {
  padding-right: 0;
  padding-left: 0;
}

.login-card-form-col {
  padding-left: 5%;
  padding-top: 3%;
}

.login-card-img {
  border-radius: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover;
}

.login-card .card-body {
  padding: 85px 60px 60px;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  min-height: 1px;
  padding: 1.25rem;
}

.brand-wrapper {
  margin-bottom: 19px;
}

.brand-wrapper .logo {
  height: 37px;
}

.login-card-description {
  font-size: 25px;
  color: #000;
  font-weight: normal;
  margin-bottom: 23px;
}

.login-card form {
  max-width: 326px;
}
.form-control {
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.form-group {
  margin-bottom: 1rem;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.login-card .form-control {
  border: 1px solid #d5dae2;
  padding: 15px 25px;
  margin-bottom: 20px;
  min-height: 45px;
  font-size: 13px;
  line-height: 15;
  font-weight: normal;
}

.login-card .login-btn {
  padding: 13px 20px 12px;
  background-color: #000;
  border-radius: 4px;
  font-size: 17px;
  font-weight: bold;
  line-height: 20px;
  color: #fff;
  margin-bottom: 24px;
}

.login-card .forgot-password-link {
  font-size: 14px;
  color: #919aa3;
  margin-bottom: 12px;
}

.login-card-footer-text {
  font-size: 16px;
  color: #0d2366;
  margin-bottom: 60px;
}

.login-card-footer-nav a {
  font-size: 14px;
  color: #919aa3;
  margin-right: 1%;
}
</style>
