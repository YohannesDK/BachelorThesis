<template>
  <nav ref="sidebar"
    id="sidebar"
    >
    <div class="sidebar-header">
      <h3>My Sidebar</h3>
    </div>

    <ul class="list-unstyled components">
      <li style="border-radius: 25px 25px">
        <fa icon="search"></fa>
        <input type="text" placeholder="Search">
      </li>

      <li class="active">
        <router-link
        to="/">
        <fa icon="home"></fa>
          Home
        </router-link></li>

      <li>
        <router-link
        to="/about">
        <fa icon="user-graduate"></fa>
          About
        </router-link></li>
    </ul>

    <button
      type="button"
      class="btn btn-info"
      @click="toogleSideBar"
    >
      <i class="fas fa-align-left"></i>
      <span>Toggle Sidebar</span>
    </button>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "NavBar",
  setup() {
    const sidebar = ref<HTMLDivElement>();
    let sidebarToogle = false;

    const toogleSideBar = () => 
    {
      (!sidebarToogle ? sidebar.value?.classList.add("active") : sidebar.value?.classList.remove("active"))
      sidebarToogle = !sidebarToogle;
    }

    return {
      sidebar,
      toogleSideBar
    }
  }
});
</script>

<style>

#sidebar {
  min-width: 250px;
  max-width: 250px;
  min-height: 100vh;
  background: #7386D5;
  color: #fff;
  transition: all 0.3s;
}

#sidebar.active {
  margin-left: -250px;
}

#sidebar .sidebar-header {
    padding: 20px;
    background: #6d7fcc;
}

#sidebar ul.components {
    padding: 20px 0;
    border-bottom: 1px solid #47748b;
}

#sidebar ul p {
    color: #fff;
    padding: 10px;
}

#sidebar ul li a {
    padding: 10px;
    font-size: 1.1em;
    display: block;
}
#sidebar ul li a:hover {
    color: #7386D5;
    background: #fff;
}

#sidebar ul li.active > a, a[aria-expanded="true"] {
    color: #fff;
    background: #6d7fcc;
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

a, a:hover, a:focus {
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

</style>