<template>

  <div>


    <div class="general">
      <h1>Hello {{ name }}</h1>
      <h2>You are a {{ role }}</h2>
      <h2>Your User ID is {{ id }}</h2>
      <button @click="logout">Logout</button>
      <br /><br />
      <!-- <form @submit.prevent="createCourse">
        <label>Create a class </label>
        <input
          id="course"
          v-model="course"
          type="text"
          placeholder="Class Name"
        />
        <input
          id="coursePassword"
          v-model="coursePassword"
          type="text"
          placeholder="Course Password"
        />

        <button>Create Class</button>
      </form> -->
    </div>

    <h2 id="Heading">Your Classes:</h2>

      <div id="modal-wrap" style="margin-left: 0;">
    <button class="button" @click="showModal = true">
      Create Course
    </button>
    <transition name="fade" appear>
      <div
        class="modal-overlay"
        v-if="showModal"
        @click="showModal = false"
      ></div>
    </transition>
    <transition name="slide" appear>
      <div class="modall" v-if="showModal">
      <form @submit.prevent="createCourse">
        <label>Create a class </label>
        <input
          id="course"
          v-model="course"
          type="text"
          placeholder="Class Name"
        />
        <input
          id="coursePassword"
          v-model="coursePassword"
          type="text"
          placeholder="Course Password"
        />

        <button>Create Class</button>
      </form>
      </div>
    </transition>
  </div>

  <div class="course" style="margin-left: 0;" v-for="course in courseName" v-bind:key="course">{{course}}</div>



  </div>

</template>

<script>
// @ is an alias to /src
import axios from "axios";

export default {
  name: "Student",

  data() {
    return {
      name: "",
      role: "",
      fullname: "",
      id: "",
      courseName: [],
      showModal: false
    };
  },

  created() {
    if (localStorage.getItem("token") === null) {
      this.$router.push("/login");
    }
  },

  components: {},

  beforeMount() {
    axios
      .get("/api/userinfo", {
        headers: { token: localStorage.getItem("token") }
      })
      .then(response => {
        this.name = response.data.user.username;
        this.role = response.data.user.role;
        this.fullname = response.data.user.fullname;
        this.id = response.data.user.id;

        console.log(response.data.courses);

        for (let i = 0; i < response.data.courses.length; i++) {
          console.log(response.data.courses[i].body);
          this.courseName.push(response.data.courses[i].body);
        }

        if (this.role == "Teacher") {
          this.$router.push("/Teacher");
        }

        if (this.role == "Student") {
          this.$router.push("/Student");
        }
      });
  },

  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/login");
    },

    // createCourse() {
    //   console.log(coursePassword.value);
    //   axios
    //     .post("api/createCourse", {
    //       userId: this.id ?? {},
    //       course: course.value ?? {},
    //       coursePassword: coursePassword.value ?? {}
    //     })
    //     .then(response => {
    //       this.courseName.push(response.data.courses.body);
    //     });
    // }
  }
};
</script>

<style scoped>
#Heading {
    margin-left: -80%;
    color: #222;
    font-size: 32px;
    font-weight: 900;
    margin-bottom: 15px;
}

button {
  width: 25%;
  margin-left: 1em;
  border-radius: 8%;
}

.general {
  text-align: center;
  margin: auto;
  width: 50%;
  border: 3px solid green;
  padding: 10px;
}

.course {
  top: 0;
  bottom: 0;
  margin-left: 0;

  margin: auto;
  padding: 2px;
  font-size: 24px;
  border: black 2px solid;
  max-width: 20%;
  margin-bottom: 1em;
}


/* Styles for modal */


h1 {
  color: #222;
  font-size: 32px;
  font-weight: 900;
  margin-bottom: 15px;
}

p {
  color: #666;
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 15px;
}

#modal-wrap {
    height: 50px;
    width: 1000px;
    
}

.button {
    margin-left: -62%;
    appearance: none;
    outline: none;
    border: none;
    background: none;
    cursor: pointer;

    display: inline-block;
    padding: 2px 7px;
    background-image: linear-gradient(to right, #00043fad, #00043fa4);
    border-radius: 100%;
    font-size: 10px;
    color: white;
    font-weight: 300;

    max-width: 5%;
    min-width: 5%;

    box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
    transition: 0.4s ease-out;
}

.buttonn {
  margin-left: 1em;
  appearance: none;
  outline: none;
  border: none;
  background: none;
  cursor: pointer;

  display: inline-block;
  padding: 5px 5px;
  background-image: linear-gradient(to right, #00043fad, #00043fa4);
  margin-top: 2em;
  border-radius: 100%;
  font-size: 10px;
  color: white;
  font-weight: 300;

  box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
  transition: 0.4s ease-out;
}

.button:hover {
  box-shadow: 6px 6px rgba(0, 0, 0, 0.6);
  color: rgb(255, 255, 255);
}

.modal-overlay {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.3);
}

.modall {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;

  width: 100%;
  max-width: 400px;
  background-color: white;
  border-radius: 16px;

  padding: 25px;
}

.fade-enter-from,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}






</style>
