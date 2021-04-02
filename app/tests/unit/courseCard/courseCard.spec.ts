import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import CourseCard from "@/components/courseCard.vue";
import { dummyCourse } from "./courseCard.utils";

// course card spec
// 1. course card should exists
// 2. course card should have a thumbnail
// 3. course card should contain course name
// 4. course card should contain course shorthand

const wrapper = shallowMount(CourseCard, {
  props: {
    course: dummyCourse
  }
});


describe("Course Card", () => {
  it("Course Card should exists", () => {
    const CourseCardContainer = wrapper.find(
      "[data-test-id='course-card-container']"
    );
    expect(CourseCardContainer.exists()).to.equal(true);
  });

  it("Course Card should have a thumbnail", () => {
    const CourseCardthumbnail = wrapper.find(
      "[data-test-id='course-card-thumbnail']"
    );
    expect(CourseCardthumbnail.exists()).to.equal(true);
  });

});

describe("Course Card - body", () => {

  it("Course Card should contain course name", () => {
    const CourseCardName = wrapper.find(
      "[data-test-id='course-card-name']"
    );
    expect(CourseCardName.text()).to.equal(dummyCourse.courseName);
  });

  it("Course Card should contain course shorthand", () => {
    const CourseCardShorthand = wrapper.find(
      "[data-test-id='course-card-shorthand']"
    );
    expect(CourseCardShorthand.text()).to.equal(dummyCourse.courseShorthand);
  });

})

