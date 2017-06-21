import React, { Component } from 'react';
import { connect } from 'dva';
import MainLayout from '../components/MainLayout';
import Link from '../components/Link';
import CheckboxWithLabel from '../components/CheckboxWithLabel';

class App extends Component {
  render() {
    return (
      <MainLayout>
        <h1>Content</h1>
        <div>
          <Link>link component</Link>
        </div>
        <div>
          <CheckboxWithLabel labelOn="ON" labelOff="OFF" />
        </div>
      </MainLayout>
    );
  }
}


export default connect()(App);
