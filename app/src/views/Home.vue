<template>
  <div class="home">
    <div
      class="jumbotron text-white jumbotron-cover shadow"
      :style="{
        backgroundImage:
          'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.89)), url(\'' +
          require('@/assets/woodBackground.jpg') +
          '\')'
      }"
    >
      <div class="welcome-message-container d-flex justify-content-between">
        <div class="welcome-message-inner">
          <h1
            class="welcome-message"
            v-test="{ id: 'dashboard-welcome-message' }"
          >
            Good Morning!
          </h1>
          <p v-test="{ id: 'dashboard-username' }">{{ user.UserName }}</p>
        </div>
        <p v-test="{ id: 'dashboard-date' }">
          {{ day }} {{ month }} {{ year }}
        </p>
      </div>
    </div>
    <div class="dashboard-container d-flex">
      <div class="dashboard-container-inner row d-flex justify-content-evenly">
        <div
          class="dashboard-card d-flex card col col-md-9 shadow"
          v-test="{ id: 'dashboard-recents-card' }"
        >
          <div class="dashboard-card-nav pb-0">
            <div class="tittle p-1">
              Recents
            </div>
            <nav
              class="navbar recents-nav"
              v-test="{ id: 'dashboard-recents-card-navbar' }"
            >
              <ul class="nav p-1">
                <li
                  class="nav-item"
                  :class="{ 'nav-active': navItem.active }"
                  @click="Active(navItem.id)"
                  v-for="navItem in navContent"
                  :key="navItem"
                >
                  <a
                    class="nav-link text-muted"
                    v-test="{ id: 'dashboard-recents-card-navbar-option' }"
                    >{{ navItem.header }}</a
                  >
                </li>
              </ul>
            </nav>
          </div>
          <div class="dashboard-card-info myscrollbar d-flex">
            <div class="documents-container d-flex p-1" v-if="navHeaderId == 0">
              <document-card
                v-for="doc in Documents"
                :key="doc.Documentid"
                :document="doc"
                :minimal="true"
              />
            </div>
            <div class="courses-container " v-if="navHeaderId == 1">
              <div class="card-container d-flex">
                <course-card
                  v-for="(course, index) in Courses"
                  :key="index"
                  :course="course"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          class="dashboard-card d-flex card col col-md-2 shadow"
          v-test="{ id: 'dashboard-notification-card' }"
        >
          <div class="dashboard-card-notivication-nav">
            <div class="tittle p-1">
              Notifications
            </div>
            <div class="dashboard-card-">
              <ul class="list-unstyled p-1 myscrollbar">
                <li
                  v-for="notification in Notifications"
                  :key="notification.id"
                >
                  <div class="notification-card d-flex flex-column">
                    <h1 class="notification">
                      {{ notification.Notification }}
                    </h1>
                    <p class="notification-date">
                      {{ notification.date }}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import store from "@/store";
import { computed, defineComponent, ref } from "vue";
import Test from "@/directives/test.directive";
import documentCard from "@/components/documentCard.vue";
import { day, month, year } from "@/utils/calender.utils";
import CourseCard from "@/components/courseCard.vue";
export default defineComponent({
  name: "Home",
  components: {
    documentCard,
    CourseCard
  },
  directives: { Test },
  setup() {
    const Notifications = ref([
      {
        id: 0,
        Notification: "Test - Wepprog",
        date: "30 March 2020"
      },
      {
        id: 1,
        Notification: "Hand In",
        date: "30 March 2020"
      },
      {
        id: 3,
        Notification: "Test - Opsys",
        date: "30 March 2020"
      },
      {
        id: 4,
        Notification: "School Trip - LA",
        date: "3 Mai 2020"
      },
      {
        id: 5,
        Notification: "School Trip - LA",
        date: "3 Mai 2020"
      },
      {
        id: 6,
        Notification: "School Trip - LA",
        date: "3 Mai 2020"
      }
    ]);
    const navContent = ref([
      {
        header: "Documents",
        active: true,
        id: 0
      },
      {
        header: "Courses",
        active: false,
        id: 1
      },
      {
        header: "Questions",
        active: false,
        id: 2
      },
      {
        header: "Resources",
        active: false,
        id: 3
      }
    ]);
    let LastActive = 0;
    const navHeaderId = ref(0);
    const Active = (id: number) => {
      navContent.value[LastActive].active = false;
      navContent.value[id].active = true;
      navHeaderId.value = id;
      LastActive = id;
    };

    const Documents = computed(() => store.getters.getDocuments);
    const Courses = computed(() => store.getters.getCourses);
    const user = computed(() => store.getters.getActiveUser);
    return {
      Notifications,
      navContent,
      navHeaderId,
      Active,
      Documents,
      Courses,
      user,
      day,
      month,
      year
    };
  }
});
</script>

<style scoped>
/* TODO - fix max width on document conatiner, when there are many documents things fuck up */
.jumbotron-cover {
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 35vh;
  display: flex;
  /* align-items: flex-end; */
}

.welcome-message-container {
  padding: 3% 3%;
  width: 100%;
  height: fit-content;
  align-items: flex-end;
}

.welcome-message {
  font-weight: 450;
  margin-bottom: 9px;
  text-shadow: 1px 1px 2px rgb(0 0 0 / 40%);
  word-break: break-word;
  overflow: hidden;
}

.welcome-message-inner p {
  padding-left: 1%;
  text-shadow: 1px 1px 2px rgb(0 0 0 / 40%);
  font-weight: 400;
}

.dashboard-container {
  position: relative;
  top: -8rem;
  margin: 0 1%;
}

.dashboard-container-inner {
  width: 100%;
}

.dashboard-card {
  min-height: 40vh;
  border-radius: 8px;
}

.dashboard-card-nav {
  justify-content: space-between;
}
.dashboard-card-notivication-nav {
  height: 100%;
  overflow: hidden;
}

.dashboard-card-notivication-nav .tittle,
.dashboard-card-nav .tittle {
  font-weight: 600;
  font-size: 1.3rem;
}

.dashboard-card-notivication-nav ul {
  overflow: scroll;
  max-height: 30vh;
  min-height: 30vh;
}

.recents-nav {
  padding-top: 0;
  padding-bottom: 0;
  position: relative;
  top: -0.6rem;
}
.recents-nav ul li:first-child .nav-link {
  padding-left: 0;
}

.recents-nav ul li .nav-link {
  cursor: pointer;
  border-bottom: 1px transparent;
}

.recents-nav ul li .nav-link:hover {
  border-bottom: 1px solid;
}

.nav-active {
  font-weight: 500;
  border-bottom: 1px solid;
}

.text-muted {
  color: #6c757d !important;
}

.dashboard-card-info {
  overflow-y: hidden;
  overflow-x: auto;
  margin-bottom: 0.5rem;
}

.courses-container {
  flex-direction: column;
  margin-bottom: 2%;
}
.card-container .card {
  /* z-index: 1; */
  transition: box-shadow 0.3s;
  min-height: 25vh;
  max-height: 25vh;
  min-width: 15rem;
  max-width: 15rem;
  margin: 0 3rem 0 0;
}

.card:hover {
  cursor: pointer;
  /* box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12) !important; */
}

.course-image {
  background: goldenrod;
  min-height: 10rem;
  width: 100%;
}

.dashboard-container {
  max-width: 100%;
}

.dashboard-card-info::-webkit-scrollbar,
.myscrollbar::-webkit-scrollbar {
  width: 2px;
  height: 0.5rem;
  margin-top: 1%;
}

.myscrollbar::-webkit-scrollbar {
  width: 0.3rem;
}

.dashboard-card-info::-webkit-scrollbar-thumb,
.myscrollbar::-webkit-scrollbar-thumb {
  background: rgb(177, 176, 176);
  border-radius: 9px;
}

.notification-card {
  margin-bottom: 3%;
  padding: 3%;
  padding-left: 0;
  border-radius: 8px;
}

.notification-card .notification {
  font-size: 1rem;
}

.notification-card .notification-date {
  font-size: 0.7rem;
}

.documents-container {
  max-width: 100%;
}
</style>
