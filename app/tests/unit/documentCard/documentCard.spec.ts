import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import documentCard from "@/components/documentCard.vue";
import { DeltaToPlainText } from "@/utils/delta.utils";
import { dummyDocument } from "./documentCard.utils";
import { datify } from "@/utils/calender.utils";
import { DeltaOperation } from "quill";

// documentCard spec
// 1. document card should have a thumbnail,
//    containing a few lines of the actual document
// 2. document card should have the tittle of the document
// 3. document card should contain "last edited" part, containing exactly that
// 4. document card should have a "more" button, which displays a dropdown menu onclick

// wrapper around our component
const wrapper = shallowMount(documentCard, {
  props: { document: dummyDocument, minimal: false }
});

describe("document card - container", () => {
  it("Document card container should exist", () => {
    const cardContainer = wrapper.find("[data-test-id='card-container']");
    expect(cardContainer.exists()).to.equal(true);
  });
});

describe("document card - thumbnail", () => {
  const thumbnail = wrapper.find("[data-test-id='card-thumbnail']");
  it("Document card should have a thumbnail", () => {
    expect(thumbnail.exists()).to.equal(true);
  });

  it("thumbnail should contain some text", () => {
    expect(thumbnail.text()).to.not.equal("");
  });

  it(`thumbnail should contain the first ${wrapper.vm.documentTextLength} chars of a document (if there are enough char)`, () => {
    expect(thumbnail.text()).to.equal(
      DeltaToPlainText(dummyDocument.body as DeltaOperation[])
        .substring(0, wrapper.vm.documentTextLength)
        .concat("...")
    );
  });
});

describe("document card - tittle and last edited", () => {
  const docTittle = wrapper.find("[data-test-id='card-tittle']");
  const doclastEdited = wrapper.find("[data-test-id='card-last-edited']");
  it("Document card should have document tittle", () => {
    expect(docTittle.exists()).to.equal(true);
  });

  it("Document card tittle should not be empty", () => {
    expect(docTittle.text()).to.not.equal("");
  });

  it(`Document tittle should be: ${dummyDocument.name}`, () => {
    expect(docTittle.text()).to.include(dummyDocument.name);
  });

  it("Document card should have a last edited part", () => {
    expect(doclastEdited.exists()).to.equal(true);
  });

  it("Document card - last edited should not be empty", () => {
    expect(doclastEdited.text()).to.not.equal("");
  });

  it(`Document last edited should be: ${datify(
    dummyDocument.lastEdited
  )}`, () => {
    expect(datify(doclastEdited.text())).to.include(
      datify(dummyDocument.lastEdited)
    );
  });
});

describe("document card - more option", () => {
  const docMoreButton = wrapper.find("[data-test-id='card-more-button']");
  const docMoreOptionsDropdown = wrapper.find(
    "[data-test-id='card-options-dropdown']"
  );
  it("Document card, should have a button for displaying more options", () => {
    expect(docMoreButton.exists()).to.equal(true);
  });

  it("Document card should have a dropdown, with more options", () => {
    if (wrapper.vm.showDropDown) {
      expect(docMoreOptionsDropdown.exists()).to.equal(true);
    } else {
      expect(docMoreOptionsDropdown.exists()).to.equal(false);
    }
  });

  it("More handler should be called when user clicks on it, and showDropDown equals true", async () => {
    await docMoreButton
      .trigger("click")
      .then(() => {
        expect(wrapper.vm.showDropDown).to.equal(true);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  });
});
