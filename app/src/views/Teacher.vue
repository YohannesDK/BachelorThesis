<template>
  <div>

    <div class="general">
    <h1>Hello {{ name }}</h1>
    <h2>You are a {{ role }}</h2>
    <h2> Your User ID is {{id}}</h2>
    <button @click="logout">Logout</button>
    <br><br>

<!-- 
    <form @submit.prevent="createCourse">
    <label>Create a class </label>
    <input id="course" v-model="course" type="text" placeholder="Class Name">
    <input id="coursePassword" v-model="coursePassword" type="text" placeholder="Course Password">
    
    <button> Create Class </button>
    </form> -->
 

    </div>

    <h1 id="Heading">Your Classes:</h1>
    <div class="course" v-for="course in courseName" v-bind:key="course">{{ course }}</div>

  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
export default {
  name: 'Student',
  data(){
    return {
      name: '',
      role:'',
      fullname: '',
      id: '',
      courseName: []
    }
  },
  
  created(){
    if (localStorage.getItem('token') === null) {
      this.$router.push("/login")
    }
  },
  
  components: {},
  
  beforeMount() {
    axios.get('/api/userinfo', { headers: {token: localStorage.getItem('token')}})
    .then(response => {
      this.name = response.data.user.username;
      this.role = response.data.user.role;
      this.fullname = response.data.user.fullname;
      this.id = response.data.user.id;
      console.log(response.data.courses)
      for (let i = 0; i < response.data.courses.length; i++){
        console.log(response.data.courses[i].body)
        this.courseName.push(response.data.courses[i].body)
      }
      if(this.role == "Teacher"){
        this.$router.push("/Teacher")
      }
      if(this.role == "Student"){
        this.$router.push("/Student")
      }
    })
  },
  methods: {
    logout(){
      localStorage.clear();
      this.$router.push("/login")
    },
    // createCourse() {
    //   console.log(coursePassword.value)
    //   axios.post('api/createCourse', {
    //   userId: this.id,
    //   course: course.value,
    //   coursePassword: coursePassword.value
    //   }).then((response) => {
    //     this.courseName.push(response.data.courses.body)
    //   })
    // },
  }
}
</script>

<style scoped>
#Heading{
  text-align: center;
}
button {
  width: 25%;
  margin-left: 1em;
  border-radius: 8%;
}
.general{
  text-align: center;
  margin: auto;
  width: 50%;
  border: 3px solid green;
  padding: 10px;
}
.course {
	top:0;
	bottom: 0;
	left: 0;
	right: 0;
  	
	margin: auto;
  padding: 2px;
  font-size: 24px;
  border: black 2px solid;
  width: 50%;
  margin-bottom: 1em;
}
</style>