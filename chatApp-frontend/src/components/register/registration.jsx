/******************************************************************************
 *  @Purpose        : Create a registration page to register the users .
 *  @file           : registration.jsx        
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 02-02-2019
 ******************************************************************************/
import React from "react";
import { userRegister } from "../../Services/userServices";
import { createMuiTheme, MuiThemeProvider, Card, TextField, Button, Snackbar } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import Fab from '@material-ui/core/Fab';
import '../../scss/main.scss';
import './registration.scss';
const theme = createMuiTheme({
    overrides: {
        MuiCard: {
            root: {
                overflow: "visible"
            },
        },
        MuiFormControl: {
            marginNormal: {
                marginTop: 4,
                marginBottom: 12
            }
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
                width: 227,
                height: 50,
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
        }
    }
})
export default class registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            Email: "",
            Password: "",
            confirmPassword: "",
            snackBarMessage: ""
        };
        this.baseState = this.state;
    }
    /**
     * Takes the firstname
     */
    handleuserfirstNameChange = event => {
        const firstName = event.target.value;
        this.setState({ firstName: firstName });
    };
    /**
     * takes the lastname
     */
    handleuserlastNameChange = event => {
        const lastName = event.target.value;
        this.setState({ lastName: lastName });
    };
    /**
     * takes the email
     */
    handleuserEmailChange = event => {
        const Email = event.target.value;
        this.setState({ Email: Email });
    };
    /**
     * takes the password
     */
    handlePasswordChange = event => {
        const Password = event.target.value;
        this.setState({ Password: Password });
    };
    /**
     * takes the confirm password
     */
    handleconfirmPasswordChange = event => {
        const confirmPassword = event.target.value;
        this.setState({ confirmPassword: confirmPassword });
    };
    /**
     * it will submit the registration page, after all field are filled and checks the all the conditions
     */
    handleSubmit = event => {
        event.preventDefault();
        if (this.state.firstName === "") {
            this.setState({
                openSnackBar: true,
                snackBarMessage: "firstName cannot be empty..!"
            });
        } else if (this.state.lastName === "") {
            this.setState({
                openSnackBar: true,
                snackBarMessage: "lastName cannot be empty..!"
            });
        } else if (this.state.Email === "") {
            this.setState({
                openSnackBar: true,
                snackBarMessage: "Email cannot be empty..!"
            });
        } else if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.state.Email)) {
            this.setState({
                openSnackBar: true,
                snackBarMessage: "Invalid Email..!"
            });
        } else if (this.state.Password === "") {
            this.setState({
                openSnackBar: true,
                snackBarMessage: "Password cannot be empty..!"
            });
        } else if (this.state.Password.length < 6) {
            this.setState({
                openSnackBar: true,
                snackBarMessage: "Password must be of atleast 6 characters long..!"
            });
        } else if (this.state.confirmPassword === "") {
            this.setState({
                openSnackBar: true,
                snackBarMessage: "Confirm Password cannot be empty..!"
            });
        } else if (this.state.Password !== this.state.confirmPassword) {
            this.setState({
                openSnackBar: true,
                snackBarMessage: "Password and confirm Password must be same..!"
            });
        } else {
            var data = {
                FirstName: this.state.firstName,
                LastName: this.state.lastName,
                Email: this.state.Email,
                Password: this.state.Password
            }
            userRegister(data)
                .then((response) => {
                    console.log(response);
                    this.setState({
                        openSnackBar: true,
                        snackBarMessage: "Registered Successfully!!"
                    });
                    this.props.history.push("/login");
                })
                .catch((err) => {
                    console.log(err);
                    this.setState({
                        openSnackBar: true,
                        snackBarMessage: "User with email id already exists!!"
                    });
                });
        }
    };
    /**
     * it will resets the page or form, if we typed wrong 
     */
    resetForm = () => {
        this.setState(this.baseState);
    };
    /**
     * it will redirect to loginpage
     */
    loginclick = e => {
        e.preventDefault();
        this.props.history.push("/login");
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
                                label="First Name"
                                type="text"
                                name="firstname"
                                value={this.state.firstName}
                                //placeholder="Enter First Name"
                                onChange={this.handleuserfirstNameChange}
                                // autoComplete="firstname"
                                margin="normal"
                                variant="outlined"
                            />
                        </div>
                        <div>
                            <TextField
                                required
                                label="Last Name"
                                type="text"
                                name="lastname"
                                value={this.state.lastName}
                                //placeholder="Enter Last Name"
                                onChange={this.handleuserlastNameChange}
                                // autoComplete="lastname"
                                margin="normal"
                                variant="outlined"
                            />
                        </div>
                        <div>
                            <TextField
                                required
                                label="Email"
                                type="email"
                                name="Email"
                                value={this.state.Email}
                                //placeholder="Enter Email"
                                onChange={this.handleuserEmailChange}
                                autoComplete="Email"
                                margin="normal"
                                variant="outlined"
                            />
                        </div>
                        <div>
                            <TextField
                                required
                                label="Password"
                                type="password"
                                name="Password"
                                value={this.state.Password}
                                //placeholder="Enter Password"
                                onChange={this.handlePasswordChange}
                                // autoComplete="Password"
                                margin="normal"
                                variant="outlined"
                            />
                        </div>
                        <div>
                            <TextField
                                required
                                label="Confirm"
                                type="password"
                                name="Password"
                                value={this.state.confirmPassword}
                                //placeholder="Confirm Password"
                                onChange={this.handleconfirmPasswordChange}
                                // autoComplete="Password"
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
                                Sign up
                            </Fab>
                        </div>
                        <div className="registerButton">
                            <Link
                                component="button"
                                // variant="body2"
                                title="Sign in"
                                onClick={this.loginclick}>
                                Sign in
                            </Link>
                            <Link
                                component="button"
                                // variant="body2"
                                title="reset"
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