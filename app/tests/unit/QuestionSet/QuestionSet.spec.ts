import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import AddNewQuestionSet from "@/views/AddNewQuestionSet.vue";
// import router from "@/router/index";

// QuestionSet specs
// 1. Questions Set container should exists
// 2. Questions Set should have a tittle
// 3. Questions Set should have a description
// 4. Questions Set should at least have one card for adding questions
// 5. Questions Set should have a button for saving questions

const wrapper = shallowMount(AddNewQuestionSet);

describe("Question Set - container", () => {
  it("Question Set container should exist", () => {
    const QSContainer = wrapper.find("[data-test-id='qs-container']");
    expect(QSContainer.exists()).to.equal(true);
  });
});

describe("Question Set - Tittle, Description and Save", () => {
  it("Question Set should have a tittle", () => {
    const QSTittle = wrapper.find("[data-test-id='qs-Tittle']");
    expect(QSTittle.exists()).to.equal(true);
  });
  it("Question Set should have a small description", () => {
    const QSTittle = wrapper.find("[data-test-id='qs-Desc']");
    expect(QSTittle.exists()).to.equal(true);
  });

  it("Question Set should have a save button for saving the question set", () => {
    const QSSave = wrapper.find("[data-test-id='qs-SaveBtn']");
    expect(QSSave.exists()).to.equal(true);
  });

  describe("Question Set - Card", () => {
    it("Question Set should at least have one question card displayed", () => {
      const QSCard = wrapper.findAll("[data-test-id='qs-Card']");
      expect(QSCard.length).to.be.greaterThan(0);
    });
  });
});

