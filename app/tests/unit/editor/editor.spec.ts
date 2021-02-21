// import { expect } from "chai";
import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import documentCard from "@/components/documentCard.vue";

// documentCard spec
// 1. document card should have a thumbnail, containing some small text
// 2. document card should have the tittle of the document
// 3. document card should contain "last edited" part
// 4. document card should have a "more" button, which displays a dropdown menu onclick 


describe("document card - container", () => {
  it("Document card container should exist", () => {
    const wrapper = shallowMount(documentCard);
    const cardContainer = wrapper.find("[data-test-card-container]")
    expect(cardContainer.exists()).to.equal(true);
  })
})


// describe("HelloWorld.vue", () => {
//   it("renders props.msg when passed", () => {
//     const msg = "new message";
//     const wrapper = shallowMount(HelloWorld, {
//       props: { msg }
//     });
//     expect(wrapper.text()).to.include(msg);
//   });
// });

