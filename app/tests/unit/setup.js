// since our tests run in node and not the browser, window objects such as localStorage doesn't exist
// so we mock our own localStorage object
const config = require('@vue/test-utils').config;

config.showDeprecationWarnings = false;

global.localStorage = {
  data: {},
  getItem(key) {
    return this.data[key];
  },
  setItem(key, value) {
    this.data[key] = value;
  },
  removeItem(key) {
    delete this.data[key];
  }
};
