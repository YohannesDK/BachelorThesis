import { expect } from "chai";
import { DOMWrapper, shallowMount } from "@vue/test-utils";
import TakeTest from "@/views/TakeTest.vue";
import { dummyQuestionSet } from "../MyQuestionSets/questionset.utils";

// 1. TakeTest should have a navbar containing questionset tittle
// 2. TakeTest should have a container containing every question in questionset
// 3. TakeTest should have a sidebar for navigating between questions
//    - when clicked it should change focus to that question
// 4. TakeTest should have a button for submitting test
// 5. TakeTest should have a button for quitting test


const  wrapper = shallowMount(TakeTest);

wrapper.vm.QuestionSet = dummyQuestionSet;

(async () => {
  await wrapper.vm.$nextTick(() => {
  
    describe("TakeTest - navbar", () => {
      it("Take Test navbar should exists", () => {
        const TakeTestNavbar = wrapper.find("[data-test-id='TakeTest-test-navbar']")
        expect(TakeTestNavbar.exists()).to.equal(true);
      })
    
      const TakeTestNavbarTittle = wrapper.find("[data-test-id='TakeTest-test-navbar-tittle']")
      it("Take Test navbar should contain questionset tittle", () => {
        expect(TakeTestNavbarTittle.exists()).to.equal(true);
      });
    
      it(`Take Test navbar tittle should be: ${dummyQuestionSet.Tittle}`, () => {
        expect(TakeTestNavbarTittle.text().toLowerCase()).to.equal(dummyQuestionSet.Tittle.toLowerCase());
      });
    })
    
    describe("TakeTest - container", () => {
      const TakeTestContainer = wrapper.find("[data-test-id='TakeTest-test-container']")
      it("Take test container should exist", () => {
        expect(TakeTestContainer.exists()).to.equal(true);
      });
    
      it(`Take Test container should contain same number of question card as questions in questionset: 
          ${dummyQuestionSet.QuestionSet.length}`, () => {
          const TakeTestQuestions = TakeTestContainer.findAll("[data-test-id='TakeTest-test-questions']")
          expect(TakeTestQuestions.length).to.equal(dummyQuestionSet.QuestionSet.length);
      })
    })
    
    describe("TakeTest - question navigation sidebar", () => {
      const TakeTestNavigationSideBar = wrapper.find("[data-test-id='TakeTest-test-question-navigation-sidebar']")
      const TakeTestNavigationSideBarItem = TakeTestNavigationSideBar.findAll("[data-test-id='TakeTest-test-question-navigation-sidebar-item']")
    
      it("Take Test Sidebar should exists", () => {
        expect(TakeTestNavigationSideBar.exists()).to.equal(true);
      });
      
      it(`Take Test SideBar should have same number of items as there are questions: ${dummyQuestionSet.QuestionSet.length}`, () => {
        expect(TakeTestNavigationSideBarItem.length).to.equal(dummyQuestionSet.QuestionSet.length);
      })
    
      it(`Take Test Sidebar should enable user to focus on selected question set when clicking on the button`, () => {
        const result: boolean[] = [];
        TakeTestNavigationSideBarItem.forEach((btn: DOMWrapper<Element>, index: number) => {
          btn.trigger("click");
          wrapper.vm.focusIndex === index ? result.push(true) : result.push(false);
        })
        expect(result.length).to.equal(dummyQuestionSet.QuestionSet.length);
        expect(result.includes(false)).to.equal(false);
      })
    });

    describe("TakeTest - submit button", () => {
      it("Take Test should have a submit button, for submitting test when done!", () => {
        const finishbtn = wrapper.find("[data-test-id='TakeTest-test-btn-submit']")
        expect(finishbtn.exists()).to.equal(true);
      })
    })

    describe("TakeTest - quit button", () => {
      it("Take Test should have a quit button, for quiting the test", () => {
        const quitbtn = wrapper.find("[data-test-id='TakeTest-test-btn-quit']")
        expect(quitbtn.exists()).to.equal(true);
      })
    })
  
  });
})()
