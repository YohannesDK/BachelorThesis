import { expect } from "chai";
import { DOMWrapper, shallowMount } from "@vue/test-utils";
import { dummyAssignmentModule  } from "./assignmentmodule.utils";
import assignmentModule from "@/components/Assignments.vue";
import { AssignmentModule, AssignmentReading, AssignmentTest } from "@/store/interfaces/assignments.types";


// Assignment Module
// 1. Assignment Module container should exist, and should contain assignment name and date
// 2. Assignment Module should have a reading section
// 3. Each reading assignment should be visible under reading section
// 4. Assignment Module should have a Tests section
// 5. Each test should be visible under tests section


const wrapper = shallowMount(assignmentModule, {
  props: {
    Assignment: dummyAssignmentModule
  }
});


describe("Assignment Module - container", () => {
  const assigmentmodulecontainer = wrapper.find(
    "[data-test-id='assignment-module-container']"
  ); 
  it("Assignment Module should exists", () => {
    expect(assigmentmodulecontainer.exists()).to.equal(true);
  });

  it("Assignment module container should display assignment name", () => {
    const assignmentmodulename = assigmentmodulecontainer.find(
      "[data-test-id='assignment-module-name']"
    ); 
    expect(assignmentmodulename.exists()).to.equal(true);
    expect(assignmentmodulename.text().toLowerCase().trim()).to.equal(dummyAssignmentModule.AssignmentName.toLowerCase().trim());
  })

  it("Assignment module container should display a date for when the assignment is due", () => {
    const assignmentmoduledate = assigmentmodulecontainer.find(
      "[data-test-id='assignment-module-date']"
    ); 
    expect(assignmentmoduledate.exists()).to.equal(true);
    expect(assignmentmoduledate.text().toLowerCase().trim()).to.equal("due " + dummyAssignmentModule.Date.toLowerCase().trim());
  })
})

describe("Assignment Module - Reading Section", () => {
  const assigmentmodulereadingcontainer = wrapper.find(
    "[data-test-id='assignment-module-reading-container']"
  ); 

  it("Assingment Module should have a reading section", () => {
    expect(assigmentmodulereadingcontainer.exists()).to.equal(true);
  })

  it("Assignment Module reading section should display each reading assignment", () => {
    const readingassignments = assigmentmodulereadingcontainer.findAll(
      "[data-test-id='assignment-module-reading-assignment']"
    );
    expect(readingassignments.length).to.equal(dummyAssignmentModule.ReadingList.length);
    readingassignments.forEach((assingment: DOMWrapper<Element>, index:number) => {
      expect(assingment.text().toLowerCase().trim()).to.equal(dummyAssignmentModule.ReadingList[index].ReadingDesc.toLowerCase().trim());
    });
  })
})


describe("Assignment Module - Tests Section", () => {
  const assignmenttestcontainer = wrapper.find(
    "[data-test-id='assignment-module-test-container']"
  ); 

  it("Assingment Module should have a tests section", () => {
    expect(assignmenttestcontainer.exists()).to.equal(true);
  })

  it("Assignment Module reading section should display each test assignment", () => {
    const testassignments = assignmenttestcontainer.findAll(
      "[data-test-id='assignment-module-test-assignment']"
    );
    expect(testassignments.length).to.equal(dummyAssignmentModule.TestList.length);
    testassignments.forEach((assingment: DOMWrapper<Element>, index:number) => {
      expect(assingment.text().toLowerCase().trim()).to.equal(dummyAssignmentModule.TestList[index].TestDesc.toLowerCase().trim());
    });
  })
})