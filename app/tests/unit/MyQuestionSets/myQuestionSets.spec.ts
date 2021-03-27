import { expect } from "chai";
import { shallowMount, DOMWrapper, mount } from "@vue/test-utils";
import { computed } from "vue";
import MyQuestionSets from "@/views/QuestionSets.vue";
import { dummyQuestionSet } from "./questionset.utils";
import { QuestionSet } from "@/store/interfaces/question.type";
import { beforeEach } from "mocha";

// 1. MyQuestionSets should exist
// 2. MyQuestionSets should have a button for adding new questionset
// 3. MyQuestionSets should have a table for displaying all questionsets
// 4. MyQuestionSets table should have a thead with these fields:
//    - Tittle
//    - Description
//    - Questions
//    - Last Edited
// 5. Each row in the table should have these fields, for each questionset:
//    - questionset Tittle
//    - questionset Description
//    - number of Questions
//    - Last Edited
// 6. Each row should have a dropdown for actions regarding that questionset
// 7. The Dropdown should have these options:
//    -   Open
//    -   Rename
//    -   Practise
//    -   Attach Question Set
//    -   Share
//    -   Delete

const wrapper = mount(MyQuestionSets);
const questionsetList: QuestionSet[] = [dummyQuestionSet];
console.log(questionsetList);


describe("MyQuestionSet - container", () => {
  it("MyQuestionSet should exists", () => {
    const MyQuestionSetContainer = wrapper.find(
      "[data-test-id='myquestionset-container']"
    );
    expect(MyQuestionSetContainer.exists()).to.equal(true);
  });
});

describe("MyQuestionSets - add new question set btn", () => {
  it("MyQuestionSets should have a button for adding new question set", () => {
    // button when there are not question sets
    const AddNewQuestionSetButtonEmpty = wrapper.find(
      "[data-test-id='myquestionset-addNewBtn-empty']"
    );

    // button when there are question sets
    const AddNewQuestionSetButton = wrapper.find(
      "[data-test-id='myquestionset-addNewBtn']"
    );
    expect(
      AddNewQuestionSetButton.exists() || AddNewQuestionSetButtonEmpty.exists()
    ).to.equal(true);
  });
});

describe("MyQuestionSet - table", async () => {
  await (() => {
    wrapper.vm.allQuestionSets = questionsetList;
  })();

  it("MyQuestionSet should have a table for displaying all questionsets", () => {
    const myQuestionSetTable = wrapper.find(
      "[data-test-id='myquestionset-table']"
    );
    expect(myQuestionSetTable.exists()).to.equal(true);
  });

  it(`MyQuestionSets table should have a header row with these fields: Tittle, 
    Description, Questions, Last Edited`, () => {
    const headerArray = ["tittle", "description", "questions", "last edited"];
    const myquestionsetTableHeaders = wrapper.findAll(
      "[data-test-id='myquestionset-table-headers']"
    );
    expect(
      headerArray.every((headerToContain: string) => {
        return (
          myquestionsetTableHeaders
            .map((header: DOMWrapper<Element>) => header.text().toLowerCase())
            .indexOf(headerToContain) >= 0
        );
      })
    ).to.equal(true);
  });

  it(`MyQuestionSets table should have as many rows as there are questionsets, in this case ${1}`, () => {
    const MyQuestionSetTableRows = wrapper.findAll(
      "[data-test-id='myquestionset-table-rows']"
    );
    // TODO - fix this shit tomorrow.
    console.log("qss", wrapper.vm.QuestionSets);
    console.log("qhtml", MyQuestionSetTableRows);
    expect(MyQuestionSetTableRows.length).to.equal(1);
  });

  // it("MyQuestionSets table row should av a dropdown button for actions regarding that questionset", () => {

  // })
});
