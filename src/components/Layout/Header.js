import React, { Component } from 'react';
import { connect } from 'dva';
import { Layout, Menu, Icon } from 'antd';
import styles from './Layout.less';

const SubMenu = Menu.SubMenu;

class Header extends Component {
  renderMenus() {
    if (this.props.signedIn) {
      return (
        <SubMenu title={<span><Icon type="user" />Hi User! </span>}>
          <Menu.Item key="setting:1"><Icon type="setting" />Options</Menu.Item>
          <Menu.Item key="/signout"><Icon type="user-delete" />Sign Out</Menu.Item>
        </SubMenu>
      );
    } else {
      return [
        <Menu.Item key="/signin">
          <Icon type="lock" />SIGN IN
        </Menu.Item>,
        <Menu.Item key="/signup">
          <Icon type="user-add" />SIGN UP
        </Menu.Item>,
      ];
    }
  }
  render() {
    return (
      <Layout.Header className={styles.header}>
        <Icon
          className={styles.trigger}
          type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.props.toggleSider}
        />
        <Menu
          mode="horizontal"
          className={styles.topMenu}
          selectable={false}
          onClick={this.props.handleClickMenu}
        >
          {this.renderMenus()}
        </Menu>
      </Layout.Header>
    );
  }
}

function mapStateToProps(state) {
  return {
    signedIn: state.auth.signedIn,
  };
}

export default connect(mapStateToProps)(Header);
