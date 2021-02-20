<template>
  <div class="container profile-container d-flex flex-column">
    <div class="row">
      <div class="col-md-3 mx-auto">
        <div ref="profileCard" class="profile-card card shadow">
          <div class="panel">
            <div class="profile-card-card">
              <img
                class="profile-img"
                src="//lh3.googleusercontent.com/-6V8xOA6M7BA/AAAAAAAAAAI/AAAAAAAAAAA/rzlHcD0KYwo/photo.jpg?sz=120"
              />
              <h1>{{ fullname }}</h1>
              <p>{{ user.email }}</p>
            </div>
            <ul class="profile-card-nav list-unstyled components">
              <li class="profile-card-li active">
                <a href="" class="text-muted">
                  <fa class="profile-li-icon" icon="user"></fa>
                  Profile
                </a>
              </li>
              <li class="profile-card-li">
                <a href="" class="text-muted">
                  <fa class="profile-li-icon" icon="edit" />
                  Edit Profile
                </a>
              </li>
              <button @click="Logout()">Logout</button>
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
                  <p><span>Full Name:</span> : {{ fullname }}</p>
                </div>
                <div class="user-info-row">
                  <p><span>Role:</span> : {{ role }}</p>
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
      </div>
    </div>
    <div class="row mt-5">
      <div class="profile-recents card shadow mx-auto">
        <div class="d-flex justify-content-between p-1">
          <h1 class="nopadding">{{ navHeader }}</h1>
          <nav class="navbar profile-recents-nav justify-content-end">
            <div :class="{ collapse: showNav }">
              <ul class="nav">
                <li
                  class="nav-item"
                  :class="{ active: navitem.active }"
                  @click="Active(index)"
                  v-for="(navitem, index) in navContent"
                  :key="index"
                >
                  <a class="nav-link text-muted" href="#">{{
                    navitem.header
                  }}</a>
                </li>
              </ul>
            </div>
            <div @click="toogleNav" class="navbar-toggler">
              <fa icon="bars" />
            </div>
          </nav>
        </div>
        <hr class="mt-0" />
        <div class="courses-container p-1" v-if="navHeader == 'Courses'">
          Courses data
        </div>
        <div class="documents-container p-1" v-if="navHeader == 'Documents'">
          documents data
        </div>
        <div class="recents-container p-1" v-if="navHeader == 'Recents'">
          recents data
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import axios from 'axios';
import { component } from "vue/types/umd";

export default defineComponent({
  name: "Profile",
  components: {},

  methods: {
    Logout(){
      localStorage.clear();
      this.$router.push("/login")
    },
  },

  created(){
    if (localStorage.getItem('token') === null) {
      this.$router.push("/login")
    }
  },

  beforeMount(){
        axios.get('/api/userinfo', { headers: {token: localStorage.getItem('token')}})
    .then(response => {
      this.name = response.data.user.username;
      this.role = response.data.user.role;
      this.fullname = response.data.user.fullname;
      this.id = response.data.user.id;
      console.log(response.data.courses)
      for (let i = 0; i < response.data.courses.length; i++){
        console.log(response.data.user.username)
        this.courseName.push(response.data.courses[i].body)
      }
      // if(this.role == "Teacher"){
      //   this.$router.push("/Teacher")
      // }
      // if(this.role == "Student"){
      //   this.$router.push("/Student")
      // }
    })
  },
  
  setup() {
    const profileNav = ref<HTMLDivElement>();
    const showNav = ref(false);
    const navContent = ref([
      {
        header: "Courses",
        active: true
      },
      {
        header: "Documents",
        active: false
      },
      {
        header: "Recents",
        active: false
      }
    ]);
    let LastActive = 0;
    const navHeader = ref("Courses");
    const toogleNav = () => {
      console.log(showNav);
      showNav.value = !showNav.value;
    };
    const Active = (index: number) => {
      navContent.value[LastActive].active = false;
      navContent.value[index].active = true;
      navHeader.value = navContent.value[index].header;
      LastActive = index;
    };
    const user = {
      username: "JohnDoe123",
      Firstname: "John",
      Lastname: "Doe",  
      email: "JohnDoe@gmail.com",
      mobile: "+47 95029950",
      Birthday: "12 June 2000",
      gender: "Male"
    };
    

    // onMounted(() => {
    //   console.log(profileNav);
    // });


    
    return {
      user,
      profileNav,
      showNav,
      toogleNav,
      navContent,
      Active,
      navHeader,
      name: '',
      role:'',
      fullname: '',
      id: '',
      courseName: [] as any
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
</style>
