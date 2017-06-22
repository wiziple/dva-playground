import { createAction } from 'redux-actions';

export const authSignin = createAction('auth/signin');
export const authSignup = createAction('auth/signup');
export const authSignout = createAction('auth/signout');

export const uiVisibleSignin = createAction('ui/visibleSignin');
