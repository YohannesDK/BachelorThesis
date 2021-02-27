import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import QuestionSetCard from "@/components/QuestionSetCard.vue";

// 1. Questions Set - card should exists
// 2. Questions Set - card should have a side bar for adding different
//    types of questions, and other options
//      with these options
//      - Add new card
//      - change type of question to - multiple choice
//      - change type of question to - short text
//      - change type of question to - long text
//      - change type of question to - true/false
// 3. Questions set - card should have a input for the question
// 4. Questions set - card should have a input for the questions

const wrapper = shallowMount(QuestionSetCard, {
  props: {
    focus: true
  }
});
describe("QuestionSet - Card", () => {
  it("QuestionSet card container should exist", () => {
    const QuestionSetCardContainer = wrapper.find(
      "[data-test-id='question-set-card-container']"
    );
    expect(QuestionSetCardContainer.exists()).to.equal(true);
  });

  it("Each questionSet card should have a side bar menu for adding different types of questions", () => {
    const QuestionSetCardSideBar = wrapper.find(
      "[data-test-id='question-set-card-sideBar']"
    );
    expect(QuestionSetCardSideBar.exists()).to.equal(true);
  });
});
