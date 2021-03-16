import { expect } from "chai";
import {shallowMount} from "@vue/test-utils"
import Dashboard from "@/views/Home.vue";

// 1. Dashboard should have a welcoming message
// 2. Dashboard should have username displayed 
// 3. Dashboard should have current date desplayed 
// 4. Dashboard should have a recents card 
// 5. Dashboard - recents card should have 
//    - navbar with:
//        - documents - navitem
//        - courses - navitem
//        - questions - navitem
//        - resources - navitem
// 6. Dashboard should have a notifications card 


const wrapper = shallowMount(Dashboard)

describe("Dashboard - welcome message", () => {
  it("welcome message should exist", () => {
    const welcomeMessage = wrapper.find("[data-test-id='dashboard-welcome-message']")
    expect(welcomeMessage.exists()).to.equal(true);
  });
})

describe("Dashboard - username", () => {
  it("username should be displayed", () => {
    const username = wrapper.find("[data-test-id='dashboard-username']")
    expect(username.exists()).to.equal(true);
  });
})

describe("Dashboard - date", () => {
  const date = wrapper.find("[data-test-id='dashboard-date']")
  it("date should be displayed", () => {
    expect(date.exists()).to.equal(true);
  });
})

describe("Dashboard - recents card", () => {
  it("recents card should exists", () => {
    const recentsCard = wrapper.find("[data-test-id='dashboard-recents-card']")
    expect(recentsCard.exists()).to.equal(true);
  });
  
  it("recents card should have a navbar", () => {
    const recentsCardNavBar = wrapper.find("[data-test-id='dashboard-recents-card-navbar']")
    expect(recentsCardNavBar.exists()).to.equal(true);
  });

  const recentsCardNavBarOptions = wrapper.findAll("[data-test-id='dashboard-recents-card-navbar-option']")
  it("recents card navbar should have 4 nav-items", () => {
    const numberOfNavItems = 4;
    expect(recentsCardNavBarOptions.length).to.equal(numberOfNavItems);
    expect(recentsCardNavBarOptions[0].text().toLowerCase()).to.equal("documents");
  });

  it("recents card navbar should have documents as the first nav item", () => {
    expect(recentsCardNavBarOptions[0].text().toLowerCase()).to.equal("documents");
  });

  it("recents card navbar should have courses as the second nav item", () => {
    expect(recentsCardNavBarOptions[1].text().toLowerCase()).to.equal("courses");
  });

  it("recents card navbar should have questions as the third nav item", () => {
    expect(recentsCardNavBarOptions[2].text().toLowerCase()).to.equal("questions");
  });

  it("recents card navbar should have resources as the fourth nav item", () => {
    expect(recentsCardNavBarOptions[3].text().toLowerCase()).to.equal("resources");
  });
})
