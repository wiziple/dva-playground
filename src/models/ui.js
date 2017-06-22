export default {
  namespace: 'ui',
  state: {
    visibleSignin: false,
  },

  reducers: {
    visibleSignin(state, action) {
      return { ...state, visibleSignin: action.payload };
    },
  },

};
