import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import ToogleSwitch from "@/components/ToogleSwitchAttachDocument.vue";

// 1. ToggleSwitch should exist
// 2. ToogleSwitch should have a switch button
// 3. ToogleSwitch should emit its state when clicked on.
// 4. ToogleSwitch should have a label

const checked = false;
const documentName = "TestDocument";

const wrapper = shallowMount(ToogleSwitch, {
  props: {
    documentId: 1,
    documentName: documentName,
    attached: checked
  }
});

describe("Toogle Switch - container", () => {
  it("Toogle Switch Should exist", () => {
    const ToogleSwitch = wrapper.find(
      "[data-test-id='ToogleSwitch-container']"
    );
    expect(ToogleSwitch.exists()).to.equal(true);
  });
});

describe("Toogle Switch button", () => {
  const ToogleSwitchButton = wrapper.find("[data-test-id='ToogleSwitch-btn']");
  it("Toogle switch button should exists", () => {
    expect(ToogleSwitchButton.exists()).to.equal(true);
  });
  it("Toggle Switch componenet should emit update when button is clicked, and it shold change its state", () => {
    ToogleSwitchButton.trigger("click");
    expect((wrapper.emitted().update[0] as Array<any>)[0].did).to.equal(1);
    expect((wrapper.emitted().update[0] as Array<any>)[0].status).to.equal(
      !checked
    );
    expect(wrapper.vm.checked).to.equal(!checked);
  });
});

describe("Toogle Switch Label", () => {
  it("Toggle Switch should have a describing label", () => {
    const ToogleSwitchLabel = wrapper.find(
      "[data-test-id='ToogleSwitch-label']"
    );
    expect(ToogleSwitchLabel.exists()).to.equal(true);
    expect(ToogleSwitchLabel.text()).to.equal(documentName);
  });
});
