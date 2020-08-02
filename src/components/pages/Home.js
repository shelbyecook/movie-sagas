import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_ALL_MOVIES',
    });
  }

  clickMovie = (event, id) => {
    this.props.history.push(`/details/${id}`);
  };

  render() {
    return (
      <div>
        <h1>Home</h1>
        {this.props.store.moviesReducer.map((item, index) => (
          <div
            key={index}
            className="listItem"
            onClick={(event) => this.clickMovie(event, item.id)}
          >
            <img src={item.poster} alt={item.title} />
            <div>
              <h5>{item.title}</h5>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mapStoreToProps = (store) => {
  return {
    store,
  };
};

export default connect(mapStoreToProps)(Home);
