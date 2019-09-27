/******************************************************************************
 *  @Purpose        : To Create Login Page.
 *  @file           : loginPage.jsx        
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 02-02-2019
 ******************************************************************************/
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Login from "../components/login";
import "../App.css";
export default class loginPage extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <AppBar position="static" align="center"><h1>Login</h1></AppBar>
                    <Login props={this.props} />
                </div>
            </div>
        )
    }
}