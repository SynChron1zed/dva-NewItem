import React, { PropTypes } from 'react';
import { Router, Route } from 'dva/router';
import Home from './routes/Home';
import Holiday from './routes/Holiday';
import Sell from './routes/Sell';
import Goods from './routes/Goods';
import Monitor from './routes/Monitor';
import Flow from './routes/Flow';
import Daypk from './routes/Daypk';
import Run from './routes/Run';
import Hours24 from './routes/Hours24';
import Login from './routes/Login';



export default function({ history }) {
  return (
    <Router history={history}>
      <Route path="/home" component={Home} />
      <Route path="/holiday" component={Holiday} />
      <Route path="/sell" component={Sell} />
      <Route path="/goods" component={Goods} />
      <Route path="/monitor" component={Monitor} />
      <Route path="/flow" component={Flow} />
      <Route path="/daypk" component={Daypk} />
      <Route path="/run" component={Run} />
      <Route path="/hours" component={Hours24} />
      <Route path="/" component={Login} />
    </Router>
  );
};



