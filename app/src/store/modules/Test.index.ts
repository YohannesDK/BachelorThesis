export default {
  state: {
    counter: 0
  },
  mutations: {
    CounterInc: (state: any) => {
      state.counter++;
    }
  },
  actions: {
    CounterInc: (context: any) => {
      context.commit("CounterInc");
    }
  },
  getters: {
    getCount: (state: any) => {
      return state.counter;
    }
  }
};
