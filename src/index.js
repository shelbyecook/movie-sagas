import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

function* rootSaga() {
  yield takeLatest('GET_ALL_MOVIES', getAllMoviesSaga);
  yield takeLatest('GET_MOVIE', getMovieSaga);
  yield takeLatest('PUT_MOVIE', putMovieDetailsSaga);
  yield takeLatest('GET_MOVIE_GENRES', getMovieGenresSaga);
}

function* getAllMoviesSaga(action) {
  try {
    const response = yield axios.get('/movies');
    yield put({
      type: 'SET_MOVIES',
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
    yield axios.put(`/movies/edit/${movieId}`, action.payload);
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
    const response = yield axios.get(`/movies/genres/${movieId}`);
    yield put({
      type: 'SET_GENRES',
      payload: response.data,
    });
  } catch (err) {
    console.warn(err);
  }
}

const sagaMiddleware = createSagaMiddleware();

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

const storeInstance = createStore(
  combineReducers({
    moviesReducer,
    movieDetailsReducer,
    movieGenresReducer,
  }),

  applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={storeInstance}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
