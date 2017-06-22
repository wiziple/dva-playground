import React from 'react';
import { Link } from 'dva/router';
import { Icon, Menu, Layout } from 'antd';
import styles from './Layout.less';

const Sider = (props) => {
  return (
    <Layout.Sider
      trigger={null}
      collapsible
      collapsed={props.collapsed}
    >
      <div className={styles.logo} />
      <Menu className={props.collapsed ? styles.sideclose : styles.sideopen} theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
          <Link to="/posts">
            <Icon type="message" />
            <span className="nav-text">Posts</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/users">
            <Icon type="user" />
            <span className="nav-text">Users</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Icon type="frown-o" />
          <span className="nav-text">404</span>
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  );
};

Sider.__ANT_LAYOUT_SIDER = true;

export default Sider;
