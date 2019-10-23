/*************************************************************************************
 *  @Purpose        : To create dashboard for displaying chatMessages and users list.
 *  @file           : dashboard.jsx        
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 02-02-2019
 ************************************************************************************/
import React from "react";
import io from 'socket.io-client';
import { chatServices, userChatArray } from "../../Services/chatServices";
import { createMuiTheme, MuiThemeProvider, Card, Tooltip, AppBar, MenuItem, IconButton } from '@material-ui/core';
import { Avatar, TextField } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import '../../scss/main.scss';
import './dashBoard.scss';
const theme = createMuiTheme({
    overrides: {
        MuiAppBar: {
            colorPrimary: {
                color: "#fff",
                backgroundColor: "ivory"
            },
            root: {
                height: "fit-content"
            }
        },
        MuiButton: {
            root: {
                textTransform: "none"
            },
            containedPrimary: {
                color: "black",
                backgroundColor: "indianred"
            }
        },
        MuiMenuItem: {
            root: {
                // overflow: "auto",
                fontSize: "10px"
            },
            gutters: {
                paddingLeft: "4px",
                paddingRight: "unset"
            }
        }
    },
    typography: {
        useNextVariants: true,
    },
})
/**
 * to import socket.io here and set the server port number
 */
const socket = io.connect('http://localhost:4000');
export default class dashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            onlineUser: [],
            MsgArray: [],
            message: "",
            MsgDisplay: "",
            Receiver: '',
            Sender: '',
            msg: [],
            anchorEl: null,
            open: false,
            placement: null
        }
    }
    componentDidMount() {
        /**
         * Get all the users data
         **/
        chatServices()
            .then((result) => {
                this.setState({
                    onlineUser: result.data.result
                })
                console.log("users", result.data.result);
            })
            .catch((error) => {
                alert(error)
            });
        /**
         * Get all users chat history to display
         **/
        userChatArray()
            .then((result) => {
                this.setState({
                    MsgArray: result.data.result
                })
                console.log("chat history is :", this.state.MsgArray);
            })
            .catch((error) => {
                alert(error);
            });
        const Sender = localStorage.getItem('Sender');
        socket.on(Sender, (res) => {
            console.log("responce in dash board========>", res);
            const msg = this.state.msg;
            msg.push(res);
            this.setState({ msg: msg });
            console.log("this set msg====>", this.state.msg);
        })
    }
    /**
     * it will takes the current typed message
     */
    handleMessage = (e) => {
        this.setState({ message: e.target.value });
    }
    /**
     * it will submit the send icon and display the message to selected user
     */
    handleSubmit = (event) => {
        event.preventDefault();
        /**
         * Get the sender who has login to the application
         **/
        const Sender = localStorage.getItem('Sender');
        this.setState({ Sender: Sender })
        console.log('Sender is :', Sender);
        console.log("Selected receiver: ", this.state.Receiver);
        //chatDisplay(Sender, this.state.Receiver, this.state.message);
        const data = {
            senderId: Sender,
            recieverId: this.state.Receiver,
            message: this.state.message,
        }
        socket.emit('new_msg', data);
        this.setState({
            message: '',
            anchorEl: null
        });
        //  this.setState({ MsgDisplay: this.state.message })
        // this.handleClick = this.handleClick.bind(this);
    }
    /**
     * Takes the users list
     */
    handleClick = (key, event) => {
        this.setState({ anchorEl: null });
        let Receiver = event.target.textContent;
        this.setState({ Receiver: Receiver });
    };
    /**
     * redirect to login page
     */
    handleLogout = event => {
        event.preventDefault();
        this.props.history.push("/login");
    }
    handleEnter = (event) => {
        try {
            if (event.key === 'Enter') {
                event.preventDefault();
                this.handleSubmit(event);
            }
        } catch (err) {
            console.log("error at handleEnter in login");
        }
    };
    render() {
        const msgdis = this.state.msg.map((key) => {
            console.log("key.senderId === this.state.senderId", key.senderId === this.state.senderId);
            return (
                <div>
                    {key.senderId === this.state.Sender ?
                        (
                            <div className="sender-div">
                                {/*<div id="heading">{key.senderId}:</div>*/}
                                <div id="heading">{key.message}</div>
                            </div>
                        )
                        :
                        (
                            <div className="receiver-div">
                                {/*<div id="heading">{key.senderId}:</div>*/}
                                <div>{key.message}</div>
                            </div>
                        )
                    }
                </div>
            )
        })
        const msg = this.state.MsgArray.map((key) => {
            return (
                <div >
                    {key.senderId === localStorage.getItem('Sender') ?
                        (
                            key.senderId === this.state.Receiver ?
                                (
                                    <div className="sender-div">
                                        {/*<div id="heading">{key.senderId}:</div>*/}
                                        <div>{key.message}</div>
                                    </div>
                                ) : (null)
                        ) : (null)
                    }
                    {key.senderId === this.state.Receiver ?
                        (
                            <div className="receiver-div">
                                {/*<div id="heading">{key.senderId}:</div>*/}
                                <div>{key.message} </div>
                            </div>
                        ) : (null)
                    }
                </div>
            )
        })
        const loginUsers = this.state.onlineUser.map((key) => {
            if (key.Email !== localStorage.getItem('Sender')) {
                return (
                    <MenuItem onClick={(event) => this.handleClick(key, event)}>{key.Email}</MenuItem>
                )
            }
            else {
                return true;
            }
        })
        const userDetails = localStorage.getItem('Sender');
        return (
            <MuiThemeProvider theme={theme}>
                <div className="Dashboard">
                    <AppBar position="static" align="center">
                        <div id="appBar">
                            <div>
                                <marquee behavior="slide" direction="left" scrollamount="20">
                                    <span id="heading">Welcome to Web Chat..!!!</span>
                                    <img src={require("../../Assets/images/30.png")} />
                                </marquee>
                            </div>
                            <div>
                                <IconButton id="userProfileIcon">
                                    <Tooltip
                                        title={"User Account  :" + userDetails}>
                                        <Avatar style={{ width: "35px", height: "35px" }} onClick={this.handleLogout} >
                                            <img style={{
                                                width: "-webkit-fill-available",
                                                height: "-webkit-fill-available"
                                            }}
                                                src={require("../../Assets/images/wtsUp.png")}></img>
                                        </Avatar>
                                    </Tooltip>
                                </IconButton>
                            </div>
                        </div>
                    </AppBar>
                    <div className="box">
                        <div className="usersList">
                            <div id="users"><u>Users List:-</u></div>
                            <div>{loginUsers}</div>
                        </div>
                        <Card className="msgDisplay">
                            <div id="users">
                                <div><u>User:-</u>{userDetails}</div>
                                <div><u>To:-</u>{this.state.Receiver}</div>
                            </div>
                            <div className="chats">
                                {msg}
                                {msgdis}
                            </div>
                            <div className="input">
                                <div>
                                    <TextField
                                        type="textfield"
                                        value={this.state.message}
                                        placeholder="Type a message ................."
                                        onChange={this.handleMessage}
                                        variant="filled"
                                        onKeyPress={this.handleEnter}
                                        InputProps={{
                                            disableUnderline: true
                                        }}
                                    />
                                </div>
                                <div id="icon">
                                    <IconButton
                                        color="secondary"
                                        title="click to send msg"
                                        onClick={this.handleSubmit}>
                                        <SendIcon />
                                    </IconButton>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </MuiThemeProvider >
        )
    }
}



// <IconButton
// color="secondary"
// title="click to send msg"
// onClick={this.handleSubmit}>
// <SendIcon />
// </IconButton>