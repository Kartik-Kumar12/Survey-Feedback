import 'materialize-css/dist/css/materialize.min.css'
import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import {createStore , applyMiddleware } from 'redux';
import App from './components/App';
import reducers from './reducers';
import reduxThunk from 'redux-thunk';
import axios from 'axios';
window.axios = axios;
const store = createStore(reducers ,{} ,applyMiddleware(reduxThunk));
ReactDom.render(
  < Provider store ={store}>
  < App / >
  </ Provider>,
  document.getElementById("root")
);
