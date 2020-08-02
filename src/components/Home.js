import React, { Component } from 'react';
// import axios from 'axios';
import { connect } from 'react-redux';

class Home extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_MOVIES',
    });
  }
  render() {
    return <div>{this.props.store.moviesReducer}</div>;
  }
}

const mapStoreToProps = (store) => ({
  store,
});

export default connect(mapStoreToProps)(Home);
