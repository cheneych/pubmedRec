import React from 'react';
import { Switch, Route } from 'react-router-dom';

import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.js';

import Layout from './hoc/layout';
import RegisterLogin from './components/Register_login';
import Register from './components/Register_login/register';
import SearchPage from './components/Search';
import Arts from './components/Articles';
import Auth from './hoc/auth';
import Dashboard from './components/Dashboard';

const Routes = () => {
  return(
    <Layout>
      <Switch>
        <Route path="/" exact component={Auth(SearchPage,null)}/>
        <Route path="/recommend" exact component={Auth(Arts,null)}/>
        <Route path="/register" exact component={Auth(Register,false)}/>
        <Route path="/register_login" exact component={Auth(RegisterLogin,false)}/>
        <Route path="/dashboard" exact component={Auth(Dashboard,true)}/>
      </Switch>
    </Layout>
  )
}

export default Routes;
