<template>
  <nav ref="sidebar" id="sidebar">
    <div class="sidebar-header">
      <h3>My Sidebar</h3>
    </div>

    <ul class="list-unstyled components">
      <div class="d-flex justify-content-center h-100 mb-1">
        <div class="searchbar">
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
        <div class="searchbar">
          <div class="add_project">Add Project</div>
          <a href="#" class="search_icon"><fa icon="plus"></fa></a>
        </div>
      </div>

      <li class="sidebar-list">
        <router-link to="/">
          <fa icon="home" class="sidebar-menu-faicons"></fa>
          <span>Home</span>
        </router-link>
      </li>

      <li class="sidebar-list">
        <router-link to="/about">
          <fa icon="user-graduate" class="sidebar-menu-faicons"></fa>
          About
        </router-link>
      </li>

      <li class="sidebar-list">
        <router-link to="/test">
          <fa icon="user-graduate" class="sidebar-menu-faicons"></fa>
          Test 1
        </router-link>
      </li>
    </ul>

    <div class="collapse_icon" @click="toogleSideBar">
      <fa icon="compress-alt"></fa>
    </div>

  </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "NavBar",
  setup() {
    const sidebar = ref<HTMLDivElement>();
    let sidebarToogle = false;

    const toogleSideBar = () => {
      !sidebarToogle
        ? sidebar.value?.classList.add("active")
        : sidebar.value?.classList.remove("active");
      sidebarToogle = !sidebarToogle;
    };
    return {
      sidebar,
      toogleSideBar
    };
  }
});
</script>

<style>
.sidebar-list {
  -webkit-transition: background-color 0.7s ease-out;
  -moz-transition: background-color 0.7s ease-out;
  -o-transition: background-color 0.7s ease-out;
  transition: background-color 0.7s ease-out;
}

.sidebar-list a.router-link-active {
  background:#444b5c;
}

.sidebar-list:hover {
  background: #3d4453;
}

.sidebar-menu-faicons{
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
  position: relative;
}

#sidebar.active {
  margin-left: -250px;
}

#sidebar .sidebar-header {
  padding: 20px;
  background: #353b48;
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
  height: 2.5em;
}

ul ul a {
  font-size: 0.9em !important;
  padding-left: 30px !important;
  background: #6d7fcc;
}

p {
  font-family: 'Poppins', sans-serif;
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

.searchbar {
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

.search_input {
  color: white;
  border: 0;
  outline: 0;
  background: none;
  width: 80%;
  caret-color:transparent;
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
  caret-color:transparent;
  line-height: 40px;
  transition: width 0.4s linear;
  padding: 0 10px;
  text-align: left;
}

.searchbar:hover > .search_input {
  padding: 0 10px;
  width: 80%;
  caret-color:red;
  transition: width 0.4s linear;
  transition: all 0.3s;
}

.search_icon:hover, .collapse_icon:hover {
  background: white;
  color: #e74c3c;
}

.search_icon,.collapse_icon {
  height: 40px;
  width: 40px;
  float: right;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color:white;
  text-decoration:none;
}

.collapse_icon{
  position: absolute;
  bottom: 0;
  right: 1px;
}
</style>