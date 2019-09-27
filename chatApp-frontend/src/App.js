/******************************************************************************
 *  @Purpose        : Here will import all the pages by using specific path.
 *  @file           : App.js        
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 02-02-2019
 ******************************************************************************/
import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import login from "../src/pages/login";
import registration from "../src/pages/registration";
import dashBoard from "../src/pages/dashBoard";
import forgotPassword from "../src/pages/forgotPassword";
import resetPassword from "../src/pages/resetPassword";
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