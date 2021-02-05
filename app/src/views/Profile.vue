<template>
  <div class="container profile-container d-flex">
    <div class="col-md-3">
      <div class="profile-card card shadow">
        <div class="panel">
          <div class="profile-card-card">
            <img
              class="profile-img"
              src="//lh3.googleusercontent.com/-6V8xOA6M7BA/AAAAAAAAAAI/AAAAAAAAAAA/rzlHcD0KYwo/photo.jpg?sz=120"
            />
            <!-- <fa icon="user" class="profile-img" /> -->
            <h1>{{ user.username }}</h1>
            <p>{{ user.email }}</p>
          </div>
          <ul class="profile-card-nav list-unstyled components">
            <li class="profile-card-li active">
              <a href="">
                <fa class="profile-li-icon" icon="user"></fa>
                Profile
              </a>
            </li>
            <li class="profile-card-li">
              <a href="">
                <fa class="profile-li-icon" icon="edit" />
                Edit Profile
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="profile-info-container col-md-8 d-flex">
      <div class="profile-info col-md-8 card shadow">
        <div class="panel">
          <h1>Info</h1>
        </div>
      </div>
      <div class="profile-info col-md-8 card shadow">
        <div class="panel">
          <h1>Info 2</h1>
        </div>
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
  justify-content: space-evenly;
}

.row {
  margin-right: -15px;
  margin-left: -15px;
  justify-content: space-evenly;
}
.card {
  border-radius: 1.55rem;
}

.profile-card {
  display: flex;
  align-items: center;
}

.profile-card-nav {
  margin-top: 2%;
}

.profile-card-li {
  height: 2.5em;
  background-color: rgb(248, 248, 248);
  margin-bottom: 1%;
  border-left: 5px solid transparent;
  padding-left: 3%;
  display: flex;
  align-items: center;
}

.profile-card-li a {
  padding: 12px 10px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 100%;
}

.profile-li-icon {
  margin-right: 2%;
  min-width: 2em;
  display: flex;
  justify-content: center;
}

.profile-card-li.active {
  border-left: 5px solid rgb(179, 179, 179);
  background-color: rgb(255, 255, 255);
}

.profile-info-container {
  flex-direction: column;
}

.profile-info {
  min-width: 90%;
  min-height: 35vh;
}

.profile-card,
.profile-info {
  margin-top: 30px;
  background: whitesmoke;
}

.panel {
  margin-top: 7%;
  margin-bottom: 20px;
  color: #353b48;
  /* background-color: #fff; */
  border: 1px solid transparent;
  border-radius: 4px;
  -webkit-box-shadow: 0 1px 1px rgb(0 0 0 / 5%);
  box-shadow: 0 1px 1px rgb(0 0 0 / 5%);
  min-width: 85%;
  max-width: 85%;
}

.profile-card-card {
  border-radius: 4px 4px 0 0;
  -webkit-border-radius: 4px 4px 0 0;
  padding: 30px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid rgba(128, 128, 128, 0.774);
  padding-bottom: 10px;
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
