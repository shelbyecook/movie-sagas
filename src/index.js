import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeLatest, put } from 'redux-saga/effects'; //latest not every
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
  yield takeLatest('GET_ALL_MOVIES', getAllMoviesSaga);
  yield takeLatest('GET_MOVIE', getMovieSaga);
  yield takeLatest('PUT_MOVIE', putMovieDetailsSaga);
  yield takeLatest('GET_MOVIE_GENRES', getMovieGenresSaga);
}

// SAGAS
function* getAllMoviesSaga(action) {
  try {
    const response = yield axios.get('/movies');
    yield put({
      type: 'SET_MOVIES', //changed from POST because it was condusing
      payload: response.data,
    });
  } catch (err) {
    console.log('error in getMoviesSaga');
  }
}

function* getMovieSaga(action) {
  try {
    const movieId = action.payload;
    const response = yield axios.get(`/movies/details/${movieId}`);
    yield put({
      type: 'SET_DETAILS',
      payload: response.data[0],
    });
  } catch (err) {
    console.warn(err);
  }
}

function* putMovieDetailsSaga(action) {
  try {
    const movieId = action.payload.id;
    yield axios.put(`/api/movies/edit/${movieId}`, action.payload);
    yield put({
      type: 'GET_MOVIE',
      payload: movieId,
    });
    yield put({
      type: 'GET_MOVIE_GENRES',
      payload: movieId,
    });
  } catch (err) {
    console.warn(err);
  }
}

function* getMovieGenresSaga(action) {
  try {
    const movieId = action.payload;
    const response = yield axios.get(`/api/movies/genres/${movieId}`);
    yield put({
      type: 'SET_GENRES',
      payload: response.data,
    });
  } catch (err) {
    console.warn(err);
  }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// REDUCERS
// Used to store movies returned from the server
const moviesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_MOVIES':
      return action.payload;
    default:
      return state;
  }
};

const movieDetailsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_DETAILS':
      return action.payload;
    default:
      return state;
  }
};

const movieGenresReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_GENRES':
      return action.payload;
    default:
      return state;
  }
};

// Create one store that all components can use
const storeInstance = createStore(
  combineReducers({
    moviesReducer,
    movieDetailsReducer,
    movieGenresReducer,
  }),
  // Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware, logger)
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={storeInstance}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
