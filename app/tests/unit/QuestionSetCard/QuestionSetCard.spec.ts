import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import QuestionSetCard from "@/components/QuestionSetCard.vue";
import { QuestionCardType } from "@/store/constants/questionCard.const";

// 1. Questions Set - card should exists
// 2. Questions Set - card should have a side bar for adding different
//    types of questions, and other options
//      with these options
//      - Add new card
//      - change type of question to - short text
//      - change type of question to - long text
//      - change type of question to - true/false
//      - change type of question to - multiple choice
// 3. Question Set - card should display right inputs depending on the QuestionType
//      - question type and card should be - short text, on render
//      - question type is changed to 1 - long text, and the card should display long text interface
//      - question type is changed to 2 - True / False, and the card should display true / false interface
//      - question type is changed to 3 - long text, and the card should display multiple choice interface

const wrapper = shallowMount(QuestionSetCard, {
  props: {
    focus: true,
    index: 0,
    QuestionCardType: QuestionCardType.EditQuestions
  }
});
describe("Question - Card", () => {
  it("Question card container should exist", () => {
    const QuestionCardContainer = wrapper.find(
      "[data-test-id='question-card-container']"
    );
    expect(QuestionCardContainer.exists()).to.equal(true);
  });
});

describe("Question Card - sidebar", () => {
  it("A question card should have a side bar menu for adding different types of questions", () => {
    const QuestionCardSideBar = wrapper.find(
      "[data-test-id='question-card-sideBar']"
    );
    expect(QuestionCardSideBar.exists()).to.equal(true);
  });

  it("A question card sidebar should have a Add New Option", () => {
    const QuestionCardSideBarAddNew = wrapper.find(
      "[data-test-id='question-card-sideBar-option-AddNew']"
    );
    expect(QuestionCardSideBarAddNew.exists()).to.equal(true);
  });

  it("A question card sidebar should have a Short Text Option", () => {
    const QuestionCardSideBarShortText = wrapper.find(
      "[data-test-id='question-card-sideBar-option-ShortText']"
    );
    expect(QuestionCardSideBarShortText.exists()).to.equal(true);
  });

  it("A question card sidebar should have a Long Text Option", () => {
    const QuestionCardSideBarLongText = wrapper.find(
      "[data-test-id='question-card-sideBar-option-LongText']"
    );
    expect(QuestionCardSideBarLongText.exists()).to.equal(true);
  });

  it("A question card sidebar should have a True / False option", () => {
    const QuestionCardSideBarTrueFalse = wrapper.find(
      "[data-test-id='question-card-sideBar-option-TrueFalse']"
    );
    expect(QuestionCardSideBarTrueFalse.exists()).to.equal(true);
  });

  it("A question card sidebar should have a Multiple Choice Option", () => {
    const QuestionCardSideBarMultipleChoice = wrapper.find(
      "[data-test-id='question-card-sideBar-option-MultipleChoice']"
    );
    expect(QuestionCardSideBarMultipleChoice.exists()).to.equal(true);
  });
});

describe("Question Card - display, depending on the QuestionType", () => {
  it("Question type should be short text, when rendering", () => {
    const QuestionCardShortText = wrapper.find(
      "[data-test-id='question-card-type-ShortText']"
    );
    expect(QuestionCardShortText.exists()).to.equal(true);
  });

  it("Question type should be Long text, when QuestionType = 1", async () => {
    // change Question Type to Long Text
    await (() => {
      wrapper.vm.QuestionType = 1;
    })();
    const QuestionCardLongText = wrapper.find(
      "[data-test-id='question-card-type-LongText']"
    );
    expect(QuestionCardLongText.exists()).to.equal(true);
  });

  it("Question type should be True / False, when QuestionType = 2", async () => {
    // change Question Type to True / False
    await (() => {
      wrapper.vm.QuestionType = 2;
    })();
    const QuestionCardTrueFalse = wrapper.find(
      "[data-test-id='question-card-type-TrueFalse']"
    );
    expect(QuestionCardTrueFalse.exists()).to.equal(true);
  });

  it("Question type should be Multiple Choice, when QuestionType = 3", async () => {
    // change Question Type to Multiple choice
    await (() => {
      wrapper.vm.QuestionType = 3;
    })();
    const QuestionCardMultipleChoice = wrapper.find(
      "[data-test-id='question-card-type-MultipleChoice']"
    );
    expect(QuestionCardMultipleChoice.exists()).to.equal(true);
  });
});

describe("Question Card - Interface for different Question Types", () => {
  it("Question Type is short text, and it should have one input for the question", async () => {
    // change Question Type to short Text
    await (() => {
      wrapper.vm.QuestionType = 0;
    })();
    const QuestionCardShortTextQuestion = wrapper.find(
      "[data-test-id='question-card-type-Question']"
    );
    expect(QuestionCardShortTextQuestion.exists()).to.equal(true);
  });
  it("Question Type is short text, and it should have one input one for the answer", () => {
    const QuestionCardShortTextAnswer = wrapper.find(
      "[data-test-id='question-card-type-Answer']"
    );
    expect(QuestionCardShortTextAnswer.exists()).to.equal(true);
  });

  it("Question Type is long text, and it should have one input for the question", async () => {
    // change Question Type to Long Text
    await (() => {
      wrapper.vm.QuestionType = 1;
    })();
    const QuestionCardLongTextQuestion = wrapper.find(
      "[data-test-id='question-card-type-Question']"
    );
    expect(QuestionCardLongTextQuestion.exists()).to.equal(true);
  });
  it("Question Type is long text, and it should have one input one for the answer", () => {
    const QuestionCardLongTextAnswer = wrapper.find(
      "[data-test-id='question-card-type-Answer']"
    );
    expect(QuestionCardLongTextAnswer.exists()).to.equal(true);
  });

  it("Question Type is True / False, and it should have one input for the question", async () => {
    // change Question Type to True / False
    await (() => {
      wrapper.vm.QuestionType = 2;
    })();
    const QuestionCardTrueFalseQuestion = wrapper.find(
      "[data-test-id='question-card-type-Question']"
    );
    expect(QuestionCardTrueFalseQuestion.exists()).to.equal(true);
  });
  it("Question Type is True / False, and it should have two divs for the answer, (either True or False)", () => {
    const QuestionCardTrueFalseAnswer = wrapper.findAll(
      "[data-test-id='question-card-type-Answer']"
    );
    expect(QuestionCardTrueFalseAnswer.length).to.equal(2);
  });

  it("Question Type is Multiple choice, and it should have one input for the question", async () => {
    // change Question Type to True / False
    await (() => {
      wrapper.vm.QuestionType = 3;
    })();
    const QuestionCardMultipleChoiceQuestion = wrapper.find(
      "[data-test-id='question-card-type-Question']"
    );
    expect(QuestionCardMultipleChoiceQuestion.exists()).to.equal(true);
  });
  it("Question Type is Multiple Choice, and it should have four divs for the answer", () => {
    const QuestionCardMultipleChoiceAnswer = wrapper.findAll(
      "[data-test-id='question-card-type-Answer']"
    );
    expect(QuestionCardMultipleChoiceAnswer.length).to.equal(4);
  });
});
