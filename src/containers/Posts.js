import React, { Component } from 'react';
import { connect } from 'dva';

class Posts extends Component {
  render() {
    return (
      <div>
        this is Post List.
      </div>
    );
  }
}

export default connect()(Posts);
