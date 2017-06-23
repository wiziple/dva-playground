import React, { Component } from 'react';
import { connect } from 'dva';
import { bindActionCreators } from 'redux';
import Layout from '../components/Layout';
import SignInModal from '../components/SignInModal';
import SignUpModal from '../components/SignUpModal';

import * as _actions from '../actions';

class App extends Component {
  state = {
    collapsed: false,
  };

  toggleSider = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  handleClickMenu = (menu) => {
    if (menu.key === '/signin') {
      this.props.actions.uiVisibleSignIn(true);
    }

    if (menu.key === '/signup') {
      this.props.actions.uiVisibleSignUp(true);
    }

    if (menu.key === '/signout') {
      this.props.actions.authSignOut();
    }
  };

  handleCancelSignInModal = () => {
    const form = this.signInForm;
    form.resetFields();
    this.props.actions.uiVisibleSignIn(false);
  }

  handleSubmitSignInModal = (e) => {
    e.preventDefault();
    const form = this.signInForm;

    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      form.resetFields();
      this.props.actions.authSignIn(values);
    });
  }

  handleRegisterSignInModal = () => {
    this.props.actions.uiVisibleSignIn(false);
    this.props.actions.uiVisibleSignUp(true);
  }

  saveSignInFormRef = (form) => {
    this.signInForm = form;
  }

  handleCancelSignUpModal = () => {
    const form = this.signUpForm;
    this.props.actions.uiVisibleSignUp(false);
    form.resetFields();
  }

  handleSubmitSignUpModal = (e) => {
    e.preventDefault();
    const form = this.signUpForm;

    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      this.props.actions.authSignUp(values);
      form.resetFields();
    });
  }

  saveSignUpFormRef = (form) => {
    this.signUpForm = form;
  }

  render() {
    const { actions, visibleSignIn, visibleSignUp, signinError, signupError } = this.props;

    const layoutProps = {
      actions,
      collapsed: this.state.collapsed,
      toggleSider: this.toggleSider,
      handleClickMenu: this.handleClickMenu,
    };

    const signInModalProps = {
      visible: visibleSignIn,
      handleRegister: this.handleRegisterSignInModal,
      handleCancel: this.handleCancelSignInModal,
      handleSubmit: this.handleSubmitSignInModal,
      ref: this.saveSignInFormRef,
      error: signinError,
    };

    const signUpModalProps = {
      visible: visibleSignUp,
      handleCancel: this.handleCancelSignUpModal,
      handleSubmit: this.handleSubmitSignUpModal,
      ref: this.saveSignUpFormRef,
      error: signupError,
    };

    return (
      <Layout {...layoutProps}>
        <SignInModal {...signInModalProps} />
        <SignUpModal {...signUpModalProps} />
        { this.props.children }
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    signinError: state.auth.signinError,
    signupError: state.auth.signupError,
    visibleSignIn: state.ui.visibleSignIn,
    visibleSignUp: state.ui.visibleSignUp,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(_actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
