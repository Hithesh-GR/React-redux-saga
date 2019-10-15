/******************************************************************************
 *  @Purpose        : Here will import all the pages by using specific path.
 *  @file           : App.js        
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 28-09-2019
 ******************************************************************************/
import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import login from "./pages/login/login";
import registration from "./pages/register/register";
import dashBoard from "./pages/dashboard/dashboard";
import forgotPassword from "./pages/forgot/forgot";
import resetPassword from "./pages/reset/reset";
export default class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <div className="App">
            <Route path="/login" component={login}></Route>
            <Route path="/" exact component={login}></Route>
            <Route path="/registration" component={registration}></Route>
            <Route path="/dashBoard" component={dashBoard}></Route>
            <Route path="/forgotPassword" component={forgotPassword}></Route>
            <Route path="/resetPassword" component={resetPassword}></Route>
          </div>
        </Router>
      </div>
    );
  }
}