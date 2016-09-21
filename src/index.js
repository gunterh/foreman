import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import {Router} from 'react-router';
import routes from './routes';
import DataActions from './actions/dataActions';
DataActions.getValueSeries();
ReactDOM.render(
  <Router routes={routes} />, document.getElementById('root')
);
