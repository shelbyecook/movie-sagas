import React, { Component } from 'react';
import { connect } from 'react-redux';

class Edit extends Component {
  state = {
    title: '',
    description: '',
  };

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

  EditDetails = (fieldKey) => (event) => {
    this.setState({
      [fieldKey]: event.target.value,
    });
  };

  clickCancel = (event) => {
    this.props.history.push(`/details/${this.props.match.params.id}`);
  };

  clickSave = (event) => {
    let newDetails = {
      ...this.state,
      id: this.props.match.params.id,
    };

    if (newDetails.title === '' || newDetails.title == null) {
      newDetails.title = this.props.store.movieDetailsReducer.title;
    }

    if (newDetails.description === '' || newDetails.description == null) {
      newDetails.description = this.props.store.movieDetailsReducer.description;
    }

    this.props.dispatch({
      type: 'PUT_MOVIE',
      payload: newDetails,
    });
    this.props.history.push(`/details/${this.props.match.params.id}`);
  };

  render() {
    return (
      <div>
        <h2>Edit Movie Details</h2>
        <h3>Current Title: {this.props.store.movieDetailsReducer.title}</h3>
        <div>
          <div>
            <input
              type="text"
              placeholder="Edit Title"
              onChange={this.EditDetails('title')}
            />
          </div>
          <div>
            <textarea
              type="text"
              placeholder="Edit Description"
              onChange={this.EditDetails('description')}
            ></textarea>
            <div>
              <button onClick={this.clickCancel}>Cancel</button>
              <button onClick={this.clickSave}>Save</button>
            </div>
          </div>
        </div>
        <h3>Associated Genres:</h3>
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

export default connect(mapStoreToProps)(Edit);
