import React from 'react';
import { Layout, LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

import Sider from './Sider';
import Header from './Header';

import styles from './Layout.less';

const LayoutIndex = (props) => {
  return (
    <LocaleProvider locale={enUS}>
      <Layout>
        <Sider {...props} />
        <Layout>
          <Header {...props} />
          <Layout.Content className={styles.content}>
            {props.children}
          </Layout.Content>
        </Layout>
      </Layout>
    </LocaleProvider>
  );
};

export default LayoutIndex;
