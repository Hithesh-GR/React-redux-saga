/******************************************************************************
 *  @Purpose        : To Create ResetPassword Page.
 *  @file           : resetPasswordPage.jsx        
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 02-02-2019
 ******************************************************************************/
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import ResetPassword from "../components/resetPassword";
import "../App.css";
export default class resetPasswordPage extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <AppBar position="static" align="center"><h1>Create a New Password</h1></AppBar>
                    <ResetPassword props={this.props} />
                </div>
            </div>
        )
    }
}