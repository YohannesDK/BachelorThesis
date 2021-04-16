import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import AttachDocument from "@/components/AttachDocumentToQuestionSet.vue";
import { documentType } from "@/store/interfaces/document";
import { dummyDocument } from "../documentCard/documentCard.utils";

// 1. Attach document-container to QS should exists
// 2. Attach document to qs should have a search bar
// 3. Attach document should display a list of documents to attach QS to
// 3. Attach document should have a toogle switch component to for each document

const documentList: documentType[] = [dummyDocument];

const wrapper = shallowMount(AttachDocument, {
  props: {
    QSID: 1
  }
});

describe("Attach Document - container", () => {
  it("Attach Document to QS - container should exists", () => {
    const AttachDocumentToQSContainer = wrapper.find(
      "[data-test-id='AttachDocumentToQS-container']"
    );
    expect(AttachDocumentToQSContainer.exists()).to.equal(true);
  });
});

describe("Attach Document - search bar", () => {
  it("Attach Document to QS should have a searchbar", () => {
    const AttachDocumentToQSSearchBar = wrapper.find(
      "[data-test-id='AttachDocumentToQS-searchbar']"
    );
    expect(AttachDocumentToQSSearchBar.exists()).to.equal(true);
  });
});

wrapper.vm.documents = documentList;
wrapper.vm.attacheddocuments.length = 0;
wrapper.vm.InitAttachments();
(async () => {
  await wrapper.vm.$nextTick(() => {
    describe("Attach Document - document list", () => {
      // make sure that we have some documents to work with, even when we go into production and dont have
      // doummy objects in our store.

      it("Attach document should have a list of documents", () => {
        const AttachDocumentToQSList = wrapper.find(
          "[data-test-id='AttachDocumentToQS-list']"
        );
        expect(AttachDocumentToQSList.exists()).to.equal(true);
      });
      it(`Attach document should have ${documentList.length} document(s)`, () => {
        const AttachDocumentToQSListItem = wrapper.findAll(
          "[data-test-id='AttachDocumentToQS-list-item']"
        );
        expect(AttachDocumentToQSListItem.length).to.equal(documentList.length);
      });
      it(`Attach document should have a toogle button for each document, in this case ${documentList.length} tooglers`, () => {
        const AttachDocumentToQSToogleBtn = wrapper.findAll(
          "[data-test-id='AttachDocumentToQS-list-tooglebtns']"
        );
        expect(AttachDocumentToQSToogleBtn.length).to.equal(
          documentList.length
        );
      });
    });
  });
})();
