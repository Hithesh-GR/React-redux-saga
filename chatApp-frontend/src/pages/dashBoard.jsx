/******************************************************************************
 *  @Purpose        : To Create DashBoard Page.
 *  @file           : dashboardPage.jsx        
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 02-02-2019
 ******************************************************************************/
import React from 'react';
import DashBoard from "../components/dashBoard";
import "../App.css";
export default class dashboardPage extends React.Component {
    render() {
        return (
            <div>
                <DashBoard props={this.props} />
            </div>
        )
    }
}