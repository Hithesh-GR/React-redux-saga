/******************************************************************************
 *  @Purpose        : Here will import all the pages by using specific path.
 *  @file           : App.js        
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 02-02-2019
 ******************************************************************************/
import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import login from "../src/components/login/login";
import registration from "../src/components/register/registration";
import dashBoard from "../src/components/dashboard/dashBoard";
import forgotPassword from "../src/components/forgot/forgotPassword";
import resetPassword from "../src/components/reset/resetPassword";
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