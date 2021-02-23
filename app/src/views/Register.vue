<template>
  <form @submit.prevent="submitForm">
    <br />
    <label>Username </label>
    <input
      id="username"
      v-model="username"
      type="text"
      placeholder="Your Username"
    /><br /><br />

    <label>Fullname </label>
    <input
      id="fullname"
      v-model="fullname"
      type="text"
      placeholder="Your Full Name"
    /><br /><br />

    <label>Password </label>
    <input
      id="password"
      v-model="password"
      type="password"
      placeholder="Your Password"
    /><br /><br />

    <label>Role</label><br />
    <select id="role" v-model="role">
      <option disabled value="">Please select one</option>
      <option>Teacher</option>
      <option>Student</option> </select
    ><br />
    <span> Selected: {{ role }}</span>
    <button>Submit</button> <br />
    <br />

    <span style="color: red">{{ error }}</span>
  </form>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      username: "",
      password: "",
      fullname: "",
      role: "",
      error: ""
    };
  },
  methods: {
    submitForm() {
      axios
        .post("api/users", {
          username: username.value,
          fullname: fullname.value,
          password: password.value,
          role: role.value
        })
        .then(response => {
          if (response.data.title == "Fail") {
            this.error = response.data.error;
            console.log(response.data.title);
          }
        });
    }
  }
};
</script>

<style></style>
