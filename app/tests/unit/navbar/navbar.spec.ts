import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import Navbar from "@/components/NavBar.vue";
// navbar spec
// 1. navbar should exist
// 2. navbar should have a home/dashboard route
// 3. navbar should have a Profile route
// 4. navbar should have a My Documents route
// 5. navbar should have a Courses route
// 6. navbar should not be visible on welcome, register and login pages 


const wrapper = shallowMount(Navbar)

describe("Navbar - container", () => {
  it("Navbar should exist", () => {
    const NavContainer = wrapper.find("[data-test-id='navbar-container']");
    expect(NavContainer.exists()).to.equal(true);
  });
});
