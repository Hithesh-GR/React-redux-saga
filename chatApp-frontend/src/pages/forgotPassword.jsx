/******************************************************************************
 *  @Purpose        : To Create ForgotPassword Page.
 *  @file           : forgotPasswordPage.jsx        
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 02-02-2019
 ******************************************************************************/
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import ForgotPassword from "../components/forgotPassword";
import "../App.css";
export default class forgotPasswordPage extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <AppBar position="static" align="center"><h1>Account Recovery....!!</h1></AppBar>
                    <ForgotPassword props={this.props} />
                </div>
            </div>
        )
    }
}