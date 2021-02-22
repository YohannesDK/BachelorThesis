import { expect } from "chai";
// import { shallowMount } from "@vue/test-utils";
// import HelloWorld from "@/components/HelloWorld.vue";

// describe("HelloWorld.vue", () => {
//   it("renders props.msg when passed", () => {
//     const msg = "new message";
//     const wrapper = shallowMount(HelloWorld, {
//       props: { msg }
//     });
//     expect(wrapper.text()).to.include(msg);
//   });
// });

describe("Dummy test frontend", () => {
  let result;
  it("Should return 5", () => {
    result = 2 + 3;
    expect(result).to.equal(5);
  });
});
