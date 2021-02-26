import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import Navbar from "@/components/NavBar.vue";
// navbar spec
// 1. navbar should exist
// 2. navbar should have a search bar
// 3. navbar should have a add new button, with possibilites to add
//    - a blank document
//    - a course
//    TODO add other options
// 4. navbar should have a home/dashboard route
// 5. navbar should have a Profile route
// 6. navbar should have a My Documents route
// 7. navbar should have a Courses route
// 8. navbar should not be visible on welcome, register and login pages 


const wrapper = shallowMount(Navbar)

describe("Navbar - container", () => {
  it("Navbar should exist", () => {
    const NavContainer = wrapper.find("[data-test-id='navbar-container']");
    expect(NavContainer.exists()).to.equal(true);
  });
});

describe("Navbar - search bar", () => {
  it("Navbar should have a search bar", () => {
    const searchbar = wrapper.find("[data-test-id='navbar-searchBar']");
    expect(searchbar.exists()).to.equal(true);
  });
});

describe("Navbar - add new", () => {
  it("Navbar should have a add new button", () => {
    const addNew = wrapper.find("[data-test-id='navbar-addNew']");
    expect(addNew.exists()).to.equal(true);
  });

  it("Add new button should display a dropdown", () => {
    const addNewDropdown = wrapper.find("[data-test-id='navbar-addNew-dropdown']");
    expect(addNewDropdown.exists()).to.equal(true);
  });

  it("Dropdown should have a Blank Document - option", () => {
    const addNewBlankDocument= wrapper.find("[data-test-id='navbar-addNew-dropdown-blank-document']");
    expect(addNewBlankDocument.exists()).to.equal(true);
    expect(addNewBlankDocument.text().toLowerCase()).to.equal("blank document")
  });

  it("Dropdown should have a Course - option", () => {
    const addNewCourse= wrapper.find("[data-test-id='navbar-addNew-dropdown-course']");
    expect(addNewCourse.exists()).to.equal(true);
    expect(addNewCourse.text().toLowerCase()).to.equal("course")
  });

});


describe("Navbar - routes", () => {
  it("Navbar should have a home/dashboard route", () => {
    const homeRoute = wrapper.find("[data-test-id='navbar-routes-home']");
    expect(homeRoute.exists()).to.equal(true);
  });

  it("Navbar should have a Profile route", () => {
    const ProfileRoute = wrapper.find("[data-test-id='navbar-routes-profile']");
    expect(ProfileRoute.exists()).to.equal(true);
  });

  it("Navbar should have a My Documents route", () => {
    const mydocumentsRoute = wrapper.find("[data-test-id='navbar-routes-myDocument']");
    expect(mydocumentsRoute.exists()).to.equal(true);
  });

  it("Navbar should have a courses route", () => {
    const coursesroute = wrapper.find("[data-test-id='navbar-routes-courses']");
    expect(coursesroute.exists()).to.equal(true);
  });

  
  // TODO - test routes, when they are clicked
});

