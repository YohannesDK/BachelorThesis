import { expect } from "chai";
import { DOMWrapper, shallowMount } from "@vue/test-utils";
import courseModule from "@/components/courseModule.vue";
import { dummycourseModule } from "./courseModule.utils";

// CourseModule Spec
// 1. Course Module container should exists
// 2. Course Module container should contain the module name
// 3. Course Module should have a section for each section in the module
// 4. Each Course Module section should have the section name
// 5. Each Course Module section should a child row for each sectionitem in that section

const wrapper = shallowMount(courseModule, {
  props: {
    courseModule: dummycourseModule,
    index: 0
  }
});

describe("Course Module - container ", () => {
  it("Course Module should exists", () => {
    const CourseModuleContainer = wrapper.find(
      "[data-test-id='course-module-container']"
    );
    expect(CourseModuleContainer.exists()).to.equal(true);
  });

  it("Course Module container should container module name", () => {
    const courseModuleName = wrapper.find(
      "[data-test-id='course-module-name']"
    );
    expect(courseModuleName.text().toLowerCase()).to.equal(dummycourseModule.moduleName.toLowerCase());
  })
});

describe("Course Module - section", () => {
  const courseModuleSections = wrapper.findAll(
    "[data-test-id='course-module-section']"
  );

  it("Course Module should have right amount of sections", () => {
    expect(courseModuleSections.length).to.equal(dummycourseModule.moduleSections.length);
  });

  it("Each Course Module Section should contain the section name", () => {
    courseModuleSections.forEach((section: DOMWrapper<Element>, index:number ) => {
      const sectionName = section.find(
        "[data-test-id='course-module-section-name']"
      );
      expect(sectionName.text()).to.equal(dummycourseModule.moduleSections[index].SectionName);
    })
  });


  it("Each Course Module section should a child row for each sectionitem in that section", () => {
    courseModuleSections.forEach((section: DOMWrapper<Element>, index:number ) => {
      const sectionItem = section.findAll(
        "[data-test-id='course-module-section-item']"
      );
      expect(sectionItem.length).to.equal(dummycourseModule.moduleSections[index].SectionItems.length);

      sectionItem.forEach((secItem: DOMWrapper<Element>, itemindex:number) => {
        const item = secItem.find(
          "[data-test-id='course-module-section-item-name']"
        );
        expect(item.text().toLowerCase()).to.equal(dummycourseModule.moduleSections[index].SectionItems[itemindex].Item.toLowerCase())
      })
    })
  });

})

