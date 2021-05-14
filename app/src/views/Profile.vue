<template>
  <div class="container profile-container d-flex flex-column">
    <div class="row p-row">
      <div class="col-md-3 p-card mx-auto">
        <div ref="profileCard" class="profile-card card shadow">
          <div class="panel">
            <div class="profile-card-card">
              <img
                class="profile-img"
                :src="require(`@/assets/teacher.jpg`)"
              />
              <p>{{ user.UserName }}</p>
            </div>
            <ul class="profile-card-nav list-unstyled components">
              <li class="profile-card-li active">
                <a href="" class="text-muted"
                @click.prevent="NotImplementedAlert()"
                >
                  <fa class="profile-li-icon" icon="user"></fa>
                  Profile
                </a>
              </li>
              <li class="profile-card-li">
                <a href="" class="text-muted"
                @click.prevent="NotImplementedAlert()"
                >
                  <fa class="profile-li-icon" icon="edit" />
                  Edit Profile
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="profile-info-container p-card col-md-8 d-flex">
        <div ref="profileUserInfo" class="profile-info col-md-8 card shadow">
          <div class="panel">
            <h1>User Info</h1>
            <hr />
            <div class="panel-inner-container">
              <div class="row">
                <div class="user-info-row">
                  <p><span>Firstname: </span>{{ user.FirstName }}</p>
                </div>
                <div class="user-info-row">
                  <p><span>Lastname: </span>{{ user.LastName }}</p>
                </div>
                <div class="user-info-row">
                  <p><span>Email: </span> {{ user.Email }}</p>
                </div>
                <div class="user-info-row">
                  <p><span>Role: </span> {{ Role }}</p>
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
import store from "@/store";
import { RoleType, UserType } from "@/store/interfaces/user.types";
import { computed, ComputedRef, defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  name: "Profile",
  setup() {
    const user: ComputedRef<UserType> = computed(() => store.getters.getActiveUser);
    const Role = computed(() => {
      if (user.value.Role === RoleType.Teacher) {
        return "Teacher" 
      }
      return "Student"
    });

    
    const NotImplementedAlert = () => {
      store.dispatch("NotImplementedAlert");
    }
 


    return {
      user,
      Role,
      NotImplementedAlert
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
  align-items: center;
}

.row {
  margin-right: -15px;
  margin-left: -15px;
  justify-content: center;
  width: 100%;
}

.card {
  border-radius: 1.25rem;
}

.profile-card {
  display: flex;
  align-items: center;
  height: 100%;
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
  height: 100%;
}

.profile-info {
  min-width: 90%;
  height: 100%;
}

.profile-card,
.profile-info,
.profile-recents {
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
  font-weight: 400;
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

.profile-recents {
  max-width: 80%;
  min-height: 35vh;
}

.profile-recents-nav ul li.active {
  text-decoration: underline;
  font-weight: bold;
  color: #3a7793;
}

.p-row {
  min-height: 35vh;
  height: 35vh;
}

.p-card {
  height: 100%;
}
</style>
