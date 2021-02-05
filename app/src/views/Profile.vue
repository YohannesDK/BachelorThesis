<template>
  <div class="container profile-container">
    <div class="row">
      <div class="profile-card col-md-3 card">
        <div class="panel">
          <div class="profile-card-card">
            <fa icon="user" class="profile-img" />
            <h1>{{ user.username }}</h1>
            <p>{{ user.email }}</p>
          </div>
        </div>
      </div>
      <div class="profile-info col-md-8 card">
        haha
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Profile",
  setup() {
    const user = {
      username: "JohnDoe123",
      Firstname: "John",
      Lastname: "Doe",
      email: "JohnDoe@gmail.com",
      gender: "male",
      mobile: "+47 95029950",
      birtday: "12 June 2000"
    };
    return {
      user
    };
  }
});
</script>

<style scoped>
.profile-container {
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 10px;
}

.row {
  margin-right: -15px;
  margin-left: -15px;
  justify-content: space-evenly;
}

.profile-card,
.profile-info {
  margin-top: 30px;
  background: #353b48;
}

.panel {
  margin-top: 7%;
  margin-bottom: 20px;
  background-color: #fff;
  border: 1px solid transparent;
  border-radius: 4px;
  -webkit-box-shadow: 0 1px 1px rgb(0 0 0 / 5%);
  box-shadow: 0 1px 1px rgb(0 0 0 / 5%);
  min-width: 90%;
}

.profile-card-card {
  border-radius: 4px 4px 0 0;
  -webkit-border-radius: 4px 4px 0 0;
  padding: 30px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-card-card a {
  border-radius: 50%;
  -webkit-border-radius: 50%;
  border: 10px solid rgba(255, 255, 255, 0.3);
  display: inline-block;
}

.profile-img {
  width: 112px;
  height: 112px;
  border-radius: 50%;
  -webkit-border-radius: 50%;
}

.profile-card-card h1 {
  font-size: 22px;
  font-weight: 300;
  margin-bottom: 5px;
}

.profile-card-card p {
  font-size: 15px;
}
</style>
