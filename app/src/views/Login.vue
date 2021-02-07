<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div>
        <label> Username </label>
        <input
          type="text"
          id="username"
          v-model="username"
          placeholder="Username"
        />

        <label> Password</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="Username"
        />

        <button>Submit</button>

        <br />

        <span> {{ error }} </span>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";

export default {
  name: "Login",
  data() {
    return {
      input: {
        username: "",
        password: "",
        error: ""
      }
    };
  },
  methods: {
    login() {
      //Make post request to backend api/user which can be found in server/server.js
      //The request to api/user runs a query and sends back a user
      axios
        .post("http://localhost:3000/api/user", {
          username: username.value,
          password: password.value
        })
        .then(response => {
          //If the post request is successful
          if (response.status === 200) {
            // If the user is a student, redirect him to student page
            if (response.data.role == "Student") {
              this.$store.commit("setAuthentication", "Student");
              localStorage.setItem("token", response.data.token);
              router.push("/Student");
            }

            // If the user is a teacher, redirect him to teacher page
            if (response.data.role == "Teacher") {
              this.$store.commit("setAuthentication", "Student");
              localStorage.setItem("token", response.data.token);
              router.push("/Teacher");
            }
          }

          // If the post request sends status 401, invalid credentials
          if ((response.data.title = "Login failed")) {
            this.error = "invalid credentials";
          }

          if ((response.data.title = "User not found")) {
            this.error = "invalid credentials";
          }
        });
    }
  },
  components: {}
  // beforeMount() {
  //   axios.get('/api/userinfo', { headers: {token: localStorage.getItem('token')}})
  //   .then(response => {
  //     this.name = response.data.user.username;
  //     this.role = response.data.user.role;
  //     this.fullname = response.data.user.fullname;
  //     this.id = response.data.user.id

  //     if(this.role == "Student"){
  //       this.$router.push("/Student")
  //     }

  //     if(this.role == "Teacher"){
  //       this.$router.push("/Teacher")
  //     }

  //   })
  // },
};
</script>

<style></style>
