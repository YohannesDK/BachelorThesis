// directive for setting data-test attributes, so our tests wont break
// if we were to change the css class- or id- selector of a component we want to test
const Test = (el: HTMLElement, binding: any) => {
  //TODO: fix so this is only applied when we are in test environment,
  //   if (process.env.NODE_ENV === 'test') {
  //    }
  Object.keys(binding.value).forEach(value => {
    el.setAttribute(`data-test-${value}`, binding.value[value]);
  });
};

export default Test
