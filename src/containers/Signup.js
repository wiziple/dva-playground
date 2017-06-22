import React, { Component } from 'react';
import { connect } from 'dva';

class Signup extends Component {
  render() {
    return (
      <div>
        this is sign up form
      </div>
    );
  }
}

export default connect()(Signup);
