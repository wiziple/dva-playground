import React from 'react';
import { connect } from 'dva';
import MainLayout from '../components/MainLayout';

function IndexPage() {
  return (
    <MainLayout>
      Content
    </MainLayout>
  );
}

export default connect()(IndexPage);
