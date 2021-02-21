# Testing vue applications

There are three parts often discussed in the context of testing a web application:
  - Unit Testing
  - Component Testing
  - End-To-End (E2E) Testing

We`ll for the most part focus on Unit and Component Testing, and if we have time try to
implement E2E Testing.

---

When Testing components in vue, its is recomennded to mainly assert our components public interface, and treat its internals as a `black box`. This is because covering the whole component would lead to too much focus on the internal implementation details and could result in very frail and breakable tests.
As such if we where to test a counter component, we would only focus on the `given input and the expected` output. And not on the internals, such as how the counter is incremented or decremented...


## Resources
- Here is a nice link on testing everything inside a vue applications
  - https://livebook.manning.com/book/testing-vue-js-applications/chapter-1/
- 