import React from 'react';
import './public.scss';

import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/configureStore";

import MainPage from './view/MainPage/MainPage'
import LoadingPage from './view/LoadingPage/LoadingPage'
import JoinPage from './view/JoinPage/JoinPage'
import LoginPage from './view/LoginPage/LoginPage'
import RecommendPage from './view/RecommendPage/RecommendPage'
import RecommendResultPage from './view/RecommendResultPage/RecommendResultPage'

const App = () => {
  return (
    <>
      <ConnectedRouter history={history}>
        <Route path="/" exact component={LoadingPage}/>
        <Route path="/main" component={MainPage}/>
        <Route path="/join" component={JoinPage}/>
        <Route path="/login" component={LoginPage}/>
        <Route path="/recommend" component={RecommendPage}/>
        <Route path="/recommendResult" component={RecommendResultPage}/>
      </ConnectedRouter>
    </>
  );
}

export default App;
