import React, { Component } from 'react';
import { connect } from 'dva';

class Users extends Component {
  render() {
    return (
      <div>
        this is User List.
      </div>
    );
  }
}


export default connect()(Users);
