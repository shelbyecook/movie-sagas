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
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
  yield takeEvery('GET_MOVIES', getMoviesSaga);
  yield takeEvery('POST_MOVIES', postMoviesSaga);
}

function* getMoviesSaga(action) {
  try {
    const response = yield axios.get('/movies');
    yield put({
      type: 'POST_MOVIES',
      payload: response.data,
    });
  } catch (err) {
    console.log('error');
  }
}

function* postMoviesSaga(action) {
  try {
    yield axios.post('/movies', action.payload);
    // put = this.props.dispatch()
    yield put({
      type: 'GET_MOVIES', //CALLING THE GET_FRUIT SAGA TO RUN, POST --> GET
    });
  } catch (err) {
    console.log('error');
  }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const moviesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_MOVIES':
      return action.payload;
    default:
      return state;
  }
};

// Used to store the movie genres
const genresReducer = (state = [], action) => {
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
    genresReducer,
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
