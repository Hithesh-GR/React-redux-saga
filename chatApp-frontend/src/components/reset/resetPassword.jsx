/******************************************************************************
 *  @Purpose        : Create a resetPassword page to reset the new password.
 *  @file           : resetPassword.jsx        
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 02-02-2019
 ******************************************************************************/
import React from "react";
import { resetPassword } from "../../Services/userServices";
import { createMuiTheme, MuiThemeProvider, Button, TextField, Card, Snackbar } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import Link from '@material-ui/core/Link';
import '../../scss/main.scss';
const theme = createMuiTheme({
    overrides: {
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
                width: 227,
                height: 50,
                margin: 6
            }
        },
        MuiLink: {
            button: {
                margin: 15
            }
        },
        MuiFormControl: {
            marginNormal: {
                marginTop: 12,
                marginBottom: 12
            }
        },
        MuiTypography: {
            body2: {
                fontFamily: "none"
            }
        }
    },
    typography: {
        useNextVariants: true,
    },
})
export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Password: "",
            newPassword: "",
            snackBarMessage: ""
        };
        this.baseState = this.state;
    }
    /**
     * it will takes the new password
     */
    handlePasswordChange = event => {
        const Password = event.target.value;
        this.setState({ Password: Password });
    };
    /**
     * it will takes the confirm newpassword
     */
    handlenewPasswordChange = event => {
        const newPassword = event.target.value;
        this.setState({ newPassword: newPassword });
    };
    /**
     * it will submit the entered password and checks the all the conditions
     */
    handleSubmit = event => {
        event.preventDefault();
        if (this.state.Password === "") {
            this.setState({
                openSnackBar: true,
                snackBarMessage: "Password cannot be empty"
            });
        } else if (this.state.newPassword === "") {
            this.setState({
                openSnackBar: true,
                snackBarMessage: "Confirm Password cannot be empty"
            });
        } else if (this.state.Password.length < 6) {
            this.setState({
                openSnackBar: true,
                snackBarMessage: "Password must be of atleast 6 characters long"
            });
        } else if (this.state.newPassword.length < 6) {
            this.setState({
                openSnackBar: true,
                snackBarMessage: "Confirm Password must be of atleast 6 characters long"
            });
        } else if (this.state.Password !== this.state.newPassword) {
            this.setState({
                openSnackBar: true,
                snackBarMessage: "Password and Confirm password must be same"
            });
        } else {
            event.preventDefault();
            let current_url = window.location.pathname;
            let verify_user_token = current_url.substr(19);
            console.log(verify_user_token);
            console.log("current ", current_url);
            resetPassword(this.state.Password, verify_user_token)
                .then((response) => {
                    console.log(response);
                    this.setState({
                        openSnackBar: true,
                        snackBarMessage: "Password changed successfully"
                    });
                    this.props.props.history.push("/login");
                })
                .catch((err) => {
                    console.log(err);
                    this.setState({
                        openSnackBar: true,
                        snackBarMessage: "Please Try Again.."
                    });
                });
        }
    };
    /**
     * it will resets the page or form if we entered wrong fields
     */
    resetForm = () => {
        this.setState(this.baseState);
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
                                label="New password"
                                type="password"
                                value={this.state.Password}
                                onChange={this.handlePasswordChange}
                                margin="normal"
                                variant="outlined"
                            />
                        </div>
                        <div>
                            <TextField
                                required
                                label="Confirm new"
                                type="password"
                                value={this.state.newPassword}
                                onChange={this.handlenewPasswordChange}
                                margin="normal"
                                variant="outlined"
                            />
                        </div>
                        <div>
                            <Fab
                                variant="extended"
                                color="secondary"
                                title="click on submit"
                                type="submit"
                                onClick={this.handleSubmit}>
                                Submit
                            </Fab>
                        </div>
                        <div>
                            <Link
                                component="button"
                                variant="body2"
                                title="click on reset"
                                onClick={this.resetForm}>
                                Reset
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
