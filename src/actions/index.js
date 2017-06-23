import { createAction } from 'redux-actions';

export const authSignIn = createAction('auth/signin');
export const authSignUp = createAction('auth/signup');
export const authSignOut = createAction('auth/signout');

export const uiVisibleSignIn = createAction('ui/visibleSignIn');
export const uiVisibleSignUp = createAction('ui/visibleSignUp');
