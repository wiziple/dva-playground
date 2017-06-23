import * as apiService from '../services/api';
import * as actions from '../actions';

export default {
  namespace: 'auth',
  state: {
    signedIn: false,
    signinError: '',
  },

  reducers: {
    signin(state) {
      return { ...state, signinError: '', signupError: '', signedIn: false };
    },
    signinSuccess(state) {
      return { ...state, signinError: '', signupError: '', signedIn: true };
    },
    signoutSuccess(state) {
      return { ...state, signinError: '', signupError: '', signedIn: false };
    },
    signinError(state, { payload }) {
      return { ...state, signinError: payload, signupError: '' };
    },
    signupError(state, { payload }) {
      return { ...state, signinError: '', signupError: payload };
    },
  },

  effects: {
    *signin({ payload }, { call, put }) {
      const { email, password, remember } = payload;
      try {
        const { data } = yield call(apiService.signin, email, password);

        if (remember) {
          localStorage.setItem('token', data.token);
        } else {
          localStorage.removeItem('token');
          sessionStorage.setItem('token', data.token);
        }

        yield put({ type: 'auth/signinSuccess' });
        yield put({ type: 'ui/visibleSignIn', payload: false });
      } catch ({ response }) {
        yield put({ type: 'signinError', payload: response.data });
      }
    },
    *signup({ payload }, { call, put }) {
      const { email, password, name } = payload;
      try {
        const { data } = yield call(apiService.signup, email, password, name);
        sessionStorage.setItem('token', data.token);

        yield put({ type: 'ui/visibleSignUp', payload: false });
        yield put({ type: 'signinSuccess' });
      } catch ({ response }) {
        yield put({ type: 'signupError', payload: response.data });
      }
    },
    *signout({ payload }, { put }) {
      localStorage.removeItem('token');
      yield put({ type: 'signoutSuccess' });
    },
  },

  subscriptions: {
    setup({ dispatch }) {  // eslint-disable-line
      const token = localStorage.getItem('token');

      if (token) {
        dispatch({
          type: 'signinSuccess',
        });
      }
    },
  },
};
