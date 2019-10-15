/******************************************************************************
 *  @Purpose        : To create a forgot password page for recover the password
                    using mail.
 *  @file           : forgotPassword.jsx       
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 02-02-2019
 ******************************************************************************/
import React from "react";
import { Card, TextField, Button, Snackbar } from '@material-ui/core';
import { forgotPassword } from "../../Services/userServices";
import '../../scss/main.scss';
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
    handleuserNameChange = event => {
        const userName = event.target.value;
        this.setState({ userName: userName });
    };
    /**
     * it will submit the forgotPasswordPage and checks all the conditions
     */
    handleSubmit = e => {
        e.preventDefault();
        if (this.state.userName === "") {
            this.setState({
                openSnackBar: true,
                snackBarMessage: "Email empty..!"
            });
        } else if (
            !/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.state.userName)
        ) {
            this.setState({
                openSnackBar: true,
                snackBarMessage: " Not found email..!"
            });
        }
        else {
            forgotPassword(this.state.userName);
        }
    };
    /**
     * redirect to register page
     */
    register = e => {
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
            <div className="container">
                <Card className="containerCard">
                    <div>
                        <span id="heading">Web Chat</span>
                    </div>
                    <div >
                        <TextField
                            required
                            label="Enter your email"
                            name="email"
                            value={this.state.userName}
                            onChange={this.handleuserNameChange}
                            autoComplete="Username"
                            margin="normal"
                            variant="outlined"
                        />
                    </div>
                    <div className="Button">
                        <Button variant="contained"
                            color="primary"
                            type="submit"
                            title="click on Create Account"
                            id="signinButton"
                            onClick={this.register}>
                            SignUp
                            </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            type="submit"
                            title="click on Submit"
                            id="signinButton"
                            onClick={this.handleSubmit}>
                            Submit
                        </Button>
                    </div>
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
                        message={<span id="heading"> {this.state.snackBarMessage} </span>}
                        action={[
                            <div key="undo">
                                <Button key="undo" color="primary" size="small" onClick={this.handleSnackClose}>
                                    UNDO
                        </Button>
                            </div>
                        ]}
                    />
                </Card>
            </div>
        );
    }
}
export { forgotPassword };