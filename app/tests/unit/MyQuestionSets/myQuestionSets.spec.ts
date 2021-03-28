import { expect } from "chai";
import { shallowMount, DOMWrapper } from "@vue/test-utils";
import MyQuestionSets from "@/views/QuestionSets.vue";
import { dummyQuestionSet, dummyQuestionSet2 } from "./questionset.utils";
import { QuestionSet } from "@/store/interfaces/question.type";

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

const wrapper = shallowMount(MyQuestionSets);
const questionsetList: QuestionSet[] = [dummyQuestionSet, dummyQuestionSet2];
const headerArray = ["tittle", "description", "questions", "last edited"];
const dropdownoptions = ["open", "rename", "practise", "attach question set", "share", "delete"];

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

  it(`MyQuestionSets table should have as many rows as there are questionsets, in this case ${questionsetList.length}`, () => {
    const MyQuestionSetTableRows = wrapper.findAll(
      "[data-test-id='myquestionset-table-rows']"
    );
    expect(MyQuestionSetTableRows.length).to.equal(questionsetList.length);
  });

  it("MyQuestionSets table row should display, questionset tittle, questionset description, number of questions, and last edited", () => {
    const MyQuestionSetTableRows = wrapper.findAll(
      "[data-test-id='myquestionset-table-rows']"
    );

    MyQuestionSetTableRows.forEach((row: DOMWrapper<Element>, index: number) => {
      const rowArray = Object.keys(questionsetList[index]).map((k) => {
        if (k === "Tittle" || k === "LastEdited") {
          return questionsetList[index][k];
        } else if (k === "Description") {
          return questionsetList[index][k].substring(0, wrapper.vm.DescriptionSubstringLength) + "..."
        }         
        else if (k === "QuestionSet") {
          return String(questionsetList[index][k].length)
        }
        return;
      }).filter((el) => el !== undefined)

      const tablerowdata = row.findAll("[data-test-id='myquestionset-table-rows-data']");
      const result = rowArray.every((ele: any) => {
        return (
          tablerowdata.map((rowdata: DOMWrapper<Element>) => rowdata.text()).indexOf(ele) >= 0
        )
      })
      expect(result).to.equal(true)
    })
  })

  // find button which will be used in the next two tests
  const MyQuestionSetTableRowDropDownbtn = wrapper.findAll(
    "[data-test-id='myquestionset-dropdown-button']"
  );
  it("MyQuestionSets table row should av a dropdown button for displaying actions regarding that questionset", () => {
    expect(MyQuestionSetTableRowDropDownbtn.length).to.equal(questionsetList.length);
  });

  it(`MyQuestionSets dropdown should be visible and have these field: ${dropdownoptions}, when button is pressed`, () => {

    MyQuestionSetTableRowDropDownbtn.forEach((btn: DOMWrapper<Element>) => {
      btn.trigger("click");
      wrapper.vm.$nextTick(() => {
        const MyQuestionSetTableRowDropDown = wrapper.find(
          "[data-test-id='myquestionset-options-dropdown']"
        );
        const dropdownitems = MyQuestionSetTableRowDropDown.findAll("[data-test-id='myquestionset-options-dropdown-items']");
        const dropdownresult = dropdownoptions.every((dropdownoption: string) => {
          return (
            dropdownitems.map((item: DOMWrapper<Element>) => item.text().toLowerCase()).indexOf(dropdownoption) >= 0
          );
        })
        expect( dropdownresult ).to.equal(true)
      })
    })
  })
});
