/******************************************************************************
 *  @Purpose        : To create a forgot password page for recover the password
                    using mail.
 *  @file           : forgotPassword.jsx       
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 02-02-2019
 ******************************************************************************/
import React from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
// import { forgotPassword } from "../Services/userServices";
export default class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            openSnackBar: false,
            snackBarMessage: ""
        };
    }
    /**
     * it will takes the forgot password user email
     */
    handleuserNameChange = (event) => {
        const userName = event.target.value;
        this.setState({ userName: userName });
    };
    /**
     * it will submit the forgotPasswordPage and checks all the conditions
     */
    // handleSubmit = e => {
    //     e.preventDefault();
    //     if (this.state.userName === "") {
    //         this.setState({
    //             openSnackBar: true,
    //             snackBarMessage: "Email empty..!"
    //         });
    //     } else if (
    //         !/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.state.userName)
    //     ) {
    //         this.setState({
    //             openSnackBar: true,
    //             snackBarMessage: " Not found email..!"
    //         });
    //     }
    //     else {
    //         forgotPassword(this.state.userName);
    //     }
    // };
    /**
     * redirect to register page
     */
    register = (e) => {
        e.preventDefault();
        this.props.history.push('/registration');
    };
    /**
     * use to auto close snackBar
     */
    handleSnackClose = () => {
        this.setState({
            openSnackBar: false
        })
    }
    render() {
        return (
            <div>
                <form align="center">
                    <div >
                        <TextField
                            label="Enter your email*"
                            name="email"
                            align="center"
                            value={this.state.userName}
                            onChange={this.handleuserNameChange}
                            autoComplete="Username"
                            margin="normal"
                            variant="filled"
                        />
                    </div>
                    <div id="button">
                        <Button
                            variant="contained"
                            color="secondary"
                            type="submit"
                            title="click on Submit"
                            id="signinButton"
                            onClick={this.handleSubmit}>
                            Submit
                            </Button>
                        <Button variant="contained"
                            color="primary"
                            type="submit"
                            title="click on Create Account"
                            id="signinButton"
                            onClick={this.register}>
                            Create Account
                            </Button>
                    </div>
                </form>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.openSnackBar}
                    autoHideDuration={6000}
                    onClose={this.handleSnackClose}
                    variant="error"
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id"> {this.state.snackBarMessage} </span>}
                    action={[
                        <div key="undo">
                            <Button key="undo" color="primary" size="small" onClick={this.handleSnackClose}>
                                UNDO
                        </Button>
                        </div>
                    ]}
                />
            </div>
        );
    }
}