<template>
  <div class="container profile-container d-flex">
    <div class="col-md-3">
      <div ref="profileCard" class="profile-card card shadow">
        <div class="panel">
          <div class="profile-card-card">
            <img
              class="profile-img"
              src="//lh3.googleusercontent.com/-6V8xOA6M7BA/AAAAAAAAAAI/AAAAAAAAAAA/rzlHcD0KYwo/photo.jpg?sz=120"
            />
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
      <div ref="profileUserInfo" class="profile-info col-md-8 card shadow">
        <div class="panel">
          <h1>User Info</h1>
          <hr />
          <div class="panel-inner-container">
            <div class="row">
              <div class="user-info-row">
                <p><span>First Name</span> : {{ user.Firstname }}</p>
              </div>
              <div class="user-info-row">
                <p><span>Last Name</span> : {{ user.Lastname }}</p>
              </div>
              <div class="user-info-row">
                <p><span>Birthday</span> : {{ user.Birthday }}</p>
              </div>
              <div class="user-info-row">
                <p><span>Gender</span> : {{ user.gender }}</p>
              </div>
              <div class="user-info-row">
                <p><span>Email</span> : {{ user.email }}</p>
              </div>
              <div class="user-info-row">
                <p><span>Mobile</span> : {{ user.mobile }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="profile-info col-md-8 card shadow">
        <div class="panel">
          <h1>Courses</h1>
          <hr />
          <div class="row">
            <div class="col-md-6">
              <div class="card">
                <div class="course-container row d-flex flex-col">
                  <div class="course-shorthand .col-sm-3">
                    DAT320
                  </div>
                  <div class="course-info .col-sm-6">
                    <h2>Oprativ Systemer</h2>
                    <a href="">Jens Hansen</a>
                    <a href="">Room</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  name: "Profile",
  setup() {
    const profileCard = ref<HTMLDivElement>();
    const profileUserInfo = ref<HTMLDivElement>();
    const user = {
      username: "JohnDoe123",
      Firstname: "John",
      Lastname: "Doe",
      email: "JohnDoe@gmail.com",
      mobile: "+47 95029950",
      Birthday: "12 June 2000",
      gender: "Male"
    };

    onMounted(() => {
      console.log(profileCard, profileUserInfo);
    });
    return {
      user,
      profileCard,
      profileUserInfo
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

.profile-card .panel {
  margin-bottom: 0;
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

.profile-card-li:hover {
  border-left: 5px solid rgba(179, 179, 179, 0.308);
}

.profile-card-li a {
  padding: 12px 0px;
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
  margin-bottom: 20px;
  color: #353b48;
  border: 1px solid transparent;
  border-radius: 4px;
  -webkit-box-shadow: 0 1px 1px rgb(0 0 0 / 5%);
  box-shadow: 0 1px 1px rgb(0 0 0 / 5%);
  min-width: 85%;
  max-width: 85%;
  padding-left: 4%;
  padding-top: 2%;
}

.panel > h1 {
  font-size: 2rem;
  font-weight: 300;
  text-transform: capitalize;
  letter-spacing: 2px;
  color: #999;
  font-variant: all-small-caps;
}

.panel-inner-container {
  width: 100%;
}

.user-info-row {
  width: 50%;
  float: left;
  margin-bottom: 10px;
  padding: 0 15px;
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

.course-container {
  display: flex;
  justify-content: space-evenly;
}

.course-shorthand {
  width: 30%;
}
.course-info {
  height: 60%;
}
</style>
