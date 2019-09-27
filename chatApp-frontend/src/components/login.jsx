/********************************************************************************
 *  @Purpose        : To create a login page for login to the registered account.
 *  @file           : login.jsx        
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 02-02-2019
 *********************************************************************************/
import React from "react";
import { userLogin } from "../Services/userServices";
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
//import Input from '../components/input'; 
export default class login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Username: "",
            Password: "",
            snackBarMessage: ""
        };
    }
    /**
     * Takes the registered user emailID
     */
    handleUsernameChange = event => {
        const Username = event.target.value;
        this.setState({ Username: Username });
    }
    /**
     * Takes the registered user password 
     */
    handlePasswordChange = event => {
        const Password = event.target.value;
        this.setState({ Password: Password });
    }
    /**
     * it will submit the login page and checks all the conditions
     */
    handleSubmit = event => {
        event.preventDefault();
        if (!this.state.Username) {
            this.setState({
                openSnackBar: true,
                snackBarMessage: "Username cannot be empty..!"
            });
        } else if (!this.state.Password) {
            this.setState({
                openSnackBar: true,
                snackBarMessage: "Password cannot be empty..!"
            });
        } else if (
            !/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.state.Username)
        ) {
            this.setState({
                openSnackBar: true,
                snackBarMessage: "Invalid Username..!"
            });
        } else if (this.state.Password.length < 6) {
            this.setState({
                openSnackBar: true,
                snackBarMessage: "Password must be of atleast 6 characters long..!"
            });
        } else {
            var data = {
                Username: this.state.Username,
                Password: this.state.Password
            }
            userLogin(data)
                .then((response) => {
                    console.log(response);
                    this.setState({
                        openSnackBar: true,
                        snackBarMessage: "Login Successfull!!"
                    });
                    localStorage.setItem('Sender', this.state.Username);
                    this.props.props.history.push('/dashBoard');
                })
                .catch((err) => {
                    console.log(err);
                    this.setState({
                        openSnackBar: true,
                        snackBarMessage: "Login failed!!"
                    });
                });
        }
    };
    /**
     * redirect or trigger to forgotPasswordPage
     */
    forgotPasswordPage = e => {
        e.preventDefault();
        this.props.props.history.push('/forgotPassword');
    };
    /**
     * redirect to registerpage
     */
    registrationclick = e => {
        e.preventDefault();
        this.props.props.history.push('/registration');
    };
    /**
     * use to auto close snackBar
     */
    handleSnackClose = () => {
        this.setState({
            openSnackBar: false
        })
    };

    render() {
        return (
            <div>
                <center>
                    <div>
                        {/* <Input handleChange={this.handleUsernameChange} label="Email*" type="text" autoComplete="Username"
                        margin="normal"
                        variant="filled"/>
                        <Input handleChange={this.handlePasswordChange} label="Password*" type="password"          autoComplete="Password"
                        margin="normal"
                        variant="filled"/> */}
                        <TextField
                            label="Email*"
                            type="text"
                            name="Username"
                            value={this.state.Username}
                            onChange={this.handleUsernameChange}
                            autoComplete="Username"
                            margin="normal"
                            variant="filled"
                        />
                    </div>
                    <div>
                        <TextField
                            label="Password*"
                            type="password"
                            value={this.state.Password}
                            onChange={this.handlePasswordChange}
                            autoComplete="Password"
                            margin="normal"
                            variant="filled"
                        />
                    </div>
                    <div id="button">
                        <Button
                            variant="contained"
                            color="secondary"
                            type="submit"
                            title="click on Signin"
                            onClick={this.handleSubmit}>
                            Signin
                                </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            title="click on Registration"
                            onClick={this.registrationclick}>
                            Registration
                                </Button>
                    </div>
                    <div>
                        <Button variant="outlined"
                            color="primary"
                            type="submit"
                            title="click on forgotPassword"
                            id="signinButton"
                            onClick={this.forgotPasswordPage}>
                            forgot Password?
                                </Button>
                    </div>
                </center>
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
export { login };
