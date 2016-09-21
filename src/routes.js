import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import HomePage from './components/homePage';
import PlanPage from './components/planPage';
import ValueSeries from './components/valueSeriesPage';
import CategoryPage from './components/categoryPage';
import ValueSeriesItems from './components/valueSeriesItems';
import Register from './components/registerPage';
import About from './components/about';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/plan" component={PlanPage} />
    <Route path="/valueseries" component={ValueSeries} />
    <Route path="/category" component={CategoryPage} />
    <Route path="/category/:id" component={CategoryPage} />
    <Route path="/valueseriesitems/:id" component={ValueSeriesItems} />
    <Route path="/register" component={Register} />
     <Route path="/about" component={About} />
  </Route>
);