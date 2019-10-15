/******************************************************************************
 *  @Purpose        : To Create DashBoard Page.
 *  @file           : dashboard.jsx        
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 28-09-2019
 ******************************************************************************/
import React from 'react';
import DashBoard from "../../components/dashboard";
import "../../App.css";
export default class dashboardPage extends React.Component {
    render() {
        return (
            <div>
                <DashBoard props={this.props} />
            </div>
        )
    }
}