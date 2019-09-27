/******************************************************************************
 *  @Purpose        : To Create Register Page.
 *  @file           : registerPage.jsx        
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 02-02-2019
 ******************************************************************************/
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Registration from "../components/registration";
import "../App.css";
export default class registrationPage extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <AppBar position="static" align="center"><h1 >Registration</h1></AppBar>
                    <Registration props={this.props} />
                </div>
            </div>
        )
    }
}