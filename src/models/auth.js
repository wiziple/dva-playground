import * as apiService from '../services/api';

export default {
  namespace: 'auth',
  state: {
    signedIn: false,
    error: '',
  },

  reducers: {
    signin(state) {
      return { ...state, error: '', signedIn: false };
    },
    signinSuccess(state) {
      return { ...state, error: '', signedIn: true };
    },
    signoutSuccess(state) {
      return { ...state, error: '', signedIn: false };
    },
    signinError(state, { payload }) {
      return { ...state, error: payload };
    },
  },

  effects: {
    *signin({ payload }, { call, put }) { // eslint-disable-line
      const { email, password, remember } = payload;
      try {
        const { data } = yield apiService.signin(email, password);

        if (remember) {
          localStorage.setItem('token', data.token);
        } else {
          localStorage.removeItem('token');
          sessionStorage.setItem('token', data.token);
        }
        yield put({ type: 'ui/visibleSignin', payload: false });
        yield put({ type: 'signinSuccess' });
      } catch ({ response }) {
        yield put({ type: 'signinError', payload: response.data });
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
