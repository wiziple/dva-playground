import React, { Component } from 'react';
import { connect } from 'dva';
import { bindActionCreators } from 'redux';
import Layout from '../components/Layout';
import SigninModal from '../components/SigninModal';

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
      this.props.actions.uiVisibleSignin(true);
    }

    if (menu.key === '/signout') {
      this.props.actions.authSignout();
    }
  };

  handleCancelSigninModal = () => {
    const form = this.form;
    form.resetFields();
    this.props.actions.uiVisibleSignin(false);
  }

  handleSubmitSigninModal = (e) => {
    e.preventDefault();
    const form = this.form;

    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      form.resetFields();
      this.props.actions.authSignin(values);
    });
  }

  saveFormRef = (form) => {
    this.form = form;
  }

  render() {
    const { actions, visibleSignin, signInError } = this.props;

    const layoutProps = {
      actions,
      collapsed: this.state.collapsed,
      toggleSider: this.toggleSider,
      handleClickMenu: this.handleClickMenu,
    };

    const signinModalProps = {
      visibleSignin,
      handleCancelSigninModal: this.handleCancelSigninModal,
      handleSubmitSigninModal: this.handleSubmitSigninModal,
      ref: this.saveFormRef,
      error: signInError,
    };

    return (
      <Layout {...layoutProps}>
        <SigninModal {...signinModalProps} />
        { this.props.children }
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    signInError: state.auth.error,
    visibleSignin: state.ui.visibleSignin,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(_actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
