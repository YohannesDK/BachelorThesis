import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import documentCard from "@/components/documentCard.vue";
import { doucmentType } from "@/store/interfaces/document";
import { DeltaToPlainText } from "@/utils/delta.utils";

// documentCard spec
// 1. document card should have a thumbnail,
//    containing a few lines of the actual document
// 2. document card should have the tittle of the document
// 3. document card should contain "last edited" part, containing exactly that
// 4. document card should have a "more" button, which displays a dropdown menu onclick

const dummyDocument: doucmentType = {
  Documentid: 0,
  name: "Dummy",
  delta: [
    { insert: "Hei Tittle" },
    { attributes: { header: 2 }, insert: "\n" },
    {
      insert:
        "\nsimply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop "
    },
    {
      attributes: { italic: true, bold: true },
      insert: "replenish be over lesser fil"
    },
    {
      insert:
        "l. Bring beast abundantly so. Every unto creature make beast divided third beast lesser whose subdue waters his. Morning seas moving living blessed abundantly unto be saw. Creeping god which. Without kind lesser."
    },
    { attributes: { blockquote: true }, insert: "\n" },
    { insert: "\n\n" },
    {
      attributes: { italic: true, link: "https://youtube.com/" },
      insert: "Youtube Link"
    },
    {
      insert:
        "\n\nGrass. Subdue don't unto sixth seasons his herb, midst sea. First it above waters deep them brought open wherein dry under living day give, she'd darkness isn't one fly. Meat deep divide. Appear good spirit their i male is two so Them together lesser dominion. Said doesn't years for. Hath brought saw a void above earth behold evening fish sea greater light for evening green days yielding is above, greater. Night you're god cattle.\n"
    }
  ],
  tags: ["Test 1"],
  lastEdited: "5 Feb 2021"
};

// wrapper around our component
const wrapper = shallowMount(documentCard, {
  props: { document: dummyDocument }
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
      DeltaToPlainText(dummyDocument.delta)
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

  it(`Document last edited should be: ${dummyDocument.lastEdited}`, () => {
    expect(doclastEdited.text()).to.include(dummyDocument.lastEdited);
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

  // TODO: finn ut av hvordan man kan sjekke om en knapp er clicked
  it("More handler should be called when user clicks on it", async () => {
    await docMoreButton.trigger("click").then(() => {
      console.log("halla");
    });
  });
});
