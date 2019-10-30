/********************************************************************************
 *  @Purpose        : To create a login page for login to the registered account.
 *  @file           : login.jsx        
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 02-02-2019
 *********************************************************************************/
import React from "react";
import { userLogin } from "../../Services/userServices";
import { createMuiTheme, MuiThemeProvider, Button, TextField, Card, Snackbar } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import Link from '@material-ui/core/Link';
import '../../scss/main.scss';
import './login.scss'
const theme = createMuiTheme({
    overrides: {
        MuiCard: {
            root: {
                overflow: "visible"
            },
        },
        MuiInputBase: {
            root: {
                color: "darkgray",
                fontFamily: "none"
            },
            input: {
                color: "darkgray",
                fontFamily: "none"
            }
        },
        MuiOutlinedInput: {
            notchedOutline: {
                borderRadius: 30
            }
        },
        MuiFormLabel: {
            root: {
                color: "darkgray",
                fontFamily: "none"
            }
        },
        MuiButton: {
            root: {
                textTransform: "none"
            }
        },
        MuiFab: {
            root: {
                textTransform: "none"
            },
            extended: {
                width: 220,
                margin: 6
            }
        },
        MuiLink: {
            button: {
                margin: 10
            }
        },
        typography: {
            useNextVariants: true,
        },
    }
})
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
                    this.props.history.push('/dashBoard');
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
        this.props.history.push('/forgotPassword');
    };
    /**
     * redirect to registerpage
     */
    registrationclick = e => {
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
        document.getElementById('Email').focus();
    };

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div className="container">
                    <Card className="containerCard">
                        <div>
                            <marquee behavior="scroll" direction="up" scrollamount="1">
                                <span id="heading">Web Chat</span>
                            </marquee>
                        </div>
                        <div>
                            <TextField
                                required
                                label="Email"
                                id="Email"
                                type="text"
                                name="Username"
                                value={this.state.Username}
                                onChange={this.handleUsernameChange}
                                // autoComplete="Username"
                                margin="normal"
                                variant="outlined"
                            />
                        </div>
                        <div>
                            <TextField
                                required
                                label="Password"
                                type="password"
                                value={this.state.Password}
                                onChange={this.handlePasswordChange}
                                // autoComplete="Password"
                                margin="normal"
                                variant="outlined"
                            />
                        </div>
                        <div>
                            <Link
                                component="button"
                                // variant="body2"
                                onClick={this.forgotPasswordPage}>
                                Forgot Password?
                            </Link>
                        </div>
                        <div >
                            <Fab
                                variant="extended"
                                color="secondary"
                                type="submit"
                                title="click on Signin"
                                onClick={this.handleSubmit}>
                                Sign in
                            </Fab>
                        </div>
                        <div>
                            <Link
                                component="button"
                                // variant="body2"
                                onClick={this.registrationclick}>
                                Sign up for WebChat
                            </Link>
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
            </MuiThemeProvider>
        );
    }
}


// <Fab
//                                 variant="extended"
//                                 color="primary"
//                                 type="submit"
//                                 title="click on forgotPassword"
//                                 // id="signinButton"
//                                 onClick={this.forgotPasswordPage}>
//                                 forgot password?
//                             </Fab>
//                             <Fab
//                                 variant="extended"
//                                 color="secondary"
//                                 type="submit"
//                                 title="click on Registration"
//                                 onClick={this.registrationclick}>
//                                 Sign up
//                             </Fab>