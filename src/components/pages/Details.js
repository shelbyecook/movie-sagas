import React, { Component } from 'react';
import { connect } from 'react-redux';

class Details extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_MOVIE',
      payload: this.props.match.params.id,
    });
    this.props.dispatch({
      type: 'GET_MOVIE_GENRES',
      payload: this.props.match.params.id,
    });
  }

  clickHome = (event) => {
    this.props.history.push('/');
  };

  clickEdit = (event) => {
    this.props.history.push(`/edit/${this.props.match.params.id}`);
  };

  render() {
    return (
      <div>
        <h1>Details</h1>

        <div>
          <button onClick={this.clickHome}>Go Home</button>
          <button onClick={this.clickEdit}>Edit</button>
        </div>

        <h5>{this.props.store.movieDetailsReducer.title}</h5>
        <p>{this.props.store.movieDetailsReducer.description}</p>

        <ul>
          {this.props.store.movieGenresReducer.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStoreToProps = (store) => ({ store });

export default connect(mapStoreToProps)(Details);
