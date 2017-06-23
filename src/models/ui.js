export default {
  namespace: 'ui',
  state: {
    visibleSignIn: false,
    visibleSignUp: false,
  },

  reducers: {
    visibleSignIn(state, action) {
      return { ...state, visibleSignIn: action.payload };
    },
    visibleSignUp(state, action) {
      return { ...state, visibleSignUp: action.payload };
    },
  },

};
