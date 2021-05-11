<template>
  <nav ref="sidebar" id="sidebar" v-test="{ id: 'navbar-container' }">
    <div class="sidebar-header">
      <img src="../assets/AppLogo.svg" alt="logo" class="logo" />
    </div>

    <ul class="list-unstyled components">
      <div class="d-flex justify-content-center h-100 mb-1">
        <div class="searchbar" v-test="{ id: 'navbar-searchBar' }">
          <input
            class="search_input"
            type="text"
            name=""
            placeholder="Search..."
          />
          <a href="#" class="search_icon"><fa icon="search"></fa></a>
        </div>
      </div>

      <div class="d-flex justify-content-center h-100 mb-1">
        <div class="addProject">
          <div class="add_project">Add New</div>
          <a
            href="#"
            class="add_icon"
            @click="addProject()"
            v-test="{ id: 'navbar-addNew' }"
            ><fa icon="plus"></fa
          ></a>
          <div class="dropdowncontainer">
            <div class="add-project-dropdown-content card shadow">
              <ul
                class="list-unstyled add-menu-dropdown"
                v-test="{ id: 'navbar-addNew-dropdown' }"
              >
                <li class="sidebar-list">
                  <a
                    href=""
                    @click.prevent="OpenEditor()"
                    v-test="{ id: 'navbar-addNew-dropdown-blank-document' }"
                  >
                    <fa icon="sticky-note" class="sidebar-menu-faicons"></fa>
                    Blank Document</a
                  >
                </li>
                <li class="sidebar-list">
                  <a href="" 
                  @click.prevent="OpenCoursesPage()"
                  v-test="{ id: 'navbar-addNew-dropdown-course' }">
                    <fa icon="book" class="sidebar-menu-faicons"></fa>
                    Course</a
                  >
                </li>
                <li class="sidebar-list">
                  <a
                    href=""
                    v-test="{ id: 'navbar-addNew-dropdown-QuestionSet' }"
                    @click.prevent="AddNewQuestionSet()"
                  >
                    <fa icon="question" class="sidebar-menu-faicons"></fa>
                    Question Set</a
                  >
                </li>
                <li class="sidebar-list">
                  <a href=""
                  @click.prevent="AddResourceGroup()"
                  >
                    <fa icon="layer-group" class="sidebar-menu-faicons"></fa>
                    Resource Group</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <li class="sidebar-list">
        <router-link to="/home" v-test="{ id: 'navbar-routes-home' }">
          <fa icon="home" class="sidebar-menu-faicons"></fa>
          <span>Home</span>
        </router-link>
      </li>

      <li class="sidebar-list">
        <router-link to="/profile" v-test="{ id: 'navbar-routes-profile' }">
          <fa icon="user" class="sidebar-menu-faicons"></fa>
          <span>Profile</span>
        </router-link>
      </li>

      <li class="sidebar-list">
        <router-link
          to="/documents"
          v-test="{ id: 'navbar-routes-myDocument' }"
        >
          <fa icon="folder" class="sidebar-menu-faicons"></fa>
          <span>My Documents</span>
        </router-link>
      </li>

      <li class="sidebar-list">
        <router-link to="/courses" v-test="{ id: 'navbar-routes-courses' }">
          <fa icon="book" class="sidebar-menu-faicons"></fa>
          <span>Courses</span>
        </router-link>
      </li>
      <li class="sidebar-list">
        <router-link
          to="/questionsets"
          v-test="{ id: 'navbar-routes-courses' }"
        >
          <fa icon="clone" class="sidebar-menu-faicons"></fa>
          <span>Question Sets</span>
        </router-link>
      </li>
    </ul>

    <div class="sign_out_icon" @click="signout(), $emit('MoveBody', false, 0)">
      <fa icon="sign-out-alt"></fa>
    </div>

    <div
      class="collapse_icon"
      v-if="showSideBar"
      @click="smallsidebar(), $emit('MoveBody', showSideBar)"
    >
      <fa icon="compress-alt"></fa>
    </div>
    <div
      class="expand_icon"
      v-if="!showSideBar"
      @click="smallsidebar(), $emit('MoveBody', showSideBar)"
    >
      <fa icon="expand-alt"></fa>
    </div>
  </nav>
</template>

<script lang="ts">
import router from "@/router";
import store from "@/store";
import { computed, ComputedRef, defineComponent, ref } from "vue";
import Test from "@/directives/test.directive.ts";
import { RoleType, UserType } from "@/store/interfaces/user.types";
import { Logout } from "@/services/api/auth.service";
import { CreateDocument } from "@/services/api/document.service";

export default defineComponent({
  name: "NavBar",
  directives: { Test },
  emits: ["MoveBody"],
  setup() {
    //SideBar
    const sidebar = ref<HTMLDivElement>();
    const showSideBar = ref<boolean>(true);
    const toogleSideBar = () => {
      if (sidebar.value) {
        showSideBar.value
          ? sidebar.value.classList.add("active")
          : sidebar.value.classList.remove("active");
        showSideBar.value = !showSideBar.value;
      }
    };

    const addProject = () => {
      console.log("Adding project");
    };

    //user handling
    const user: ComputedRef<UserType> = computed(() => {
      return store.getters.getActiveUser;
    });

    const userEmpty = computed(() => {
      return Object.entries(user).length > 0;
    });

    const signout = () => {
      Logout();
    };

    // Editor
    const OpenEditor = () => {
      const newDocID = CreateDocument(user.value.UserID);

      newDocID.then((docid: number | undefined) => {
        if (docid && typeof docid === "number") {
          router.push({ name: "EditorView", query: { did: docid} });
        }
      });

    };

    const OpenCoursesPage = () => {
      router.push({name: "Courses"});
    }

    const AddResourceGroup = () => {
      store.dispatch("NotImplementedAlert");
    }

    const smallsidebar = () => {
      if (sidebar.value) {
        showSideBar.value
          ? sidebar.value.classList.add("small-sidebar")
          : sidebar.value.classList.remove("small-sidebar");
        showSideBar.value = !showSideBar.value;
      }
    };

    //QuestionSet
    const AddNewQuestionSet = () => {
      router.push({ name: "AddQuestionSet", query: { QSID: -1 } });
    };

    return {
      user,
      userEmpty,
      signout,
      sidebar,
      toogleSideBar,
      showSideBar,
      addProject,
      OpenEditor,
      AddNewQuestionSet,
      smallsidebar,
      OpenCoursesPage,
      AddResourceGroup
    };
  }
});
</script>

<style scoped>
.logo {
  max-width: 30%;
}
.sidebar-list {
  -webkit-transition: background-color 0.7s ease-out;
  -moz-transition: background-color 0.7s ease-out;
  -o-transition: background-color 0.7s ease-out;
  transition: background-color 0.7s ease-out;
}

.sidebar-list a.router-link-active {
  background: #444b5c;
}

.sidebar-list:hover {
  background: #3d4453;
}

.sidebar-menu-faicons {
  margin-right: 2%;
  min-width: 2em;
  display: flex;
  justify-content: center;
}

#sidebar {
  min-width: 250px;
  max-width: 250px;
  min-height: 100vh;
  background: #353b48;
  color: #fff;
  transition: all 0.3s;
  position: fixed;
  z-index: 1;
}

#sidebar.active {
  margin-left: -250px;
}

#sidebar .sidebar-header {
  padding: 20px;
  background: #353b48;
  text-align: center;
}

#sidebar ul.components {
  padding: 20px 0;
  border-bottom: 1px solid #404757;
}

#sidebar ul p {
  color: #f5f9ff;
  padding: 10px;
}

#sidebar ul li a {
  padding: 12px 10px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

/* #sidebar ul li.active > a, a[aria-expanded="true"] {
  color: #fff;
  background: #4a5368;
} */

#sidebar ul li {
  min-height: 2.5em;
  height: fit-content;
}

ul ul a {
  font-size: 0.9em !important;
  padding-left: 30px !important;
  background: #6d7fcc;
}

p {
  font-family: "Poppins", sans-serif;
  font-size: 1.1em;
  font-weight: 300;
  line-height: 1.7em;
  color: #999;
}

a,
a:hover,
a:focus {
  color: inherit;
  text-decoration: none;
  transition: all 0.3s;
}

@media (max-width: 768px) {
  #sidebar {
    margin-left: -250px;
  }
  #sidebar.active {
    margin-left: 0;
  }
}

.searchbar,
.addProject {
  margin-bottom: auto;
  margin-top: auto;
  height: 50px;
  background-color: #4a5368;
  border-radius: 30px;
  padding: 10px;
  display: flex;
  align-items: center;
  width: 95%;
}

.addProject {
  background-color: #3a7793;
  cursor: pointer;
  position: relative;
}

.search_input {
  color: white;
  border: 0;
  outline: 0;
  background: none;
  width: 80%;
  caret-color: transparent;
  line-height: 40px;
  transition: width 0.4s linear;
  padding: 0 10px;
}
.add_project {
  color: white;
  border: 0;
  outline: 0;
  background: none;
  width: 80%;
  caret-color: transparent;
  line-height: 40px;
  transition: width 0.4s linear;
  padding: 0 10px;
  text-align: left;
}

.searchbar:hover > .search_input {
  padding: 0 10px;
  width: 80%;
  caret-color: red;
  transition: width 0.4s linear;
  transition: all 0.3s;
}

.sign_out_icon {
  border: 0;
  position: absolute;
  top: 1.78rem;
  right: 4%;
  min-width: 1.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 1.8rem;
  transition: all 0.3s;
}

.sign_out_icon:hover {
  cursor: pointer;
  background: #4a5368;
  /* color: #e74c3c; */
  border-radius: 3px;
}

.search_icon:hover,
.collapse_icon:hover,
.expand_icon:hover,
.add_icon:hover {
  background: white;
  color: #e74c3c;
}

.search_icon,
.collapse_icon,
.expand_icon,
.add_icon {
  height: 40px;
  width: 40px;
  float: right;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: white;
  text-decoration: none;
  transition: all 0.4s;
  z-index: 2;
}

.collapse_icon {
  position: absolute;
  bottom: 0;
  right: 1px;
}

.expand_icon {
  background: #353b48;
  color: whitesmoke;
  position: absolute;
  bottom: 1px;
  right: -42px;
}

.expand_icon:hover {
  /* background: white; */
  color: #e74c3c;
}

.add_icon:hover ~ .dropdowncontainer {
  display: block;
  opacity: 1;
}

.add-project-dropdown-content {
  float: right;
  width: 90%;
  transition: all 0.4s;
  border-radius: 0.8rem;
  width: fit-content;
  min-width: 90%;
}

.dropdowncontainer {
  display: none;
  position: absolute;
  z-index: 1;
  right: -90%;
  min-width: 100%;
  padding-left: 6%;
  opacity: 0;
  transition: opacity 1s ease;
  color: black;
}

.dropdowncontainer:hover {
  display: block;
  opacity: 1;
}

.dropdowncontainer ul li a {
  background-color: whitesmoke;
  padding-left: 10px !important;
}

.dropdowncontainer ul li:hover > a {
  background-color: rgb(185, 185, 185);
}

.add-menu-dropdown li:nth-child(1),
.add-menu-dropdown li:nth-child(1) > a {
  border-top-right-radius: 0.8rem;
  border-top-left-radius: 0.8rem;
}

.add-menu-dropdown li:last-child,
.add-menu-dropdown li:last-child > a {
  border-bottom-right-radius: 0.8rem;
  border-bottom-left-radius: 0.8rem;
}

/* When minimizing sidebar */

#sidebar.small-sidebar {
  min-width: 3.3rem;
  width: 3.3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#sidebar.small-sidebar .sidebar-header h3 {
  display: none;
}

#sidebar.small-sidebar .addProject,
#sidebar.small-sidebar .searchbar {
  width: fit-content;
  height: fit-content;
  padding: 0;
  border-radius: 50%;
}

#sidebar.small-sidebar .add_project,
#sidebar.small-sidebar .search_input {
  display: none;
}

#sidebar.small-sidebar ul li a span {
  display: none;
}

#sidebar.small-sidebar .sign_out_icon {
  top: 1.28rem;
  right: unset;
}

#sidebar.small-sidebar .collapse_icon {
  display: none;
}

#sidebar.small-sidebar .expand_icon {
  right: unset;
  left: 6px;
}

#sidebar.small-sidebar .dropdowncontainer {
  width: 13em;
  right: -482%;
}
</style>
