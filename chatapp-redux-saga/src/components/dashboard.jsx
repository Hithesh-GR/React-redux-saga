/*************************************************************************************
 *  @Purpose        : To create dashboard for displaying chatMessages and users list.
 *  @file           : dashboard.jsx        
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 02-02-2019
 ************************************************************************************/
import React from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
// import { chatServices, userChatArray } from "../Services/chatServices";
import AppBar from '@material-ui/core/AppBar';
import "../App.css";
/**
 * to import socket.io here and set the server port number
 */
// import io from 'socket.io-client';
// const socket = io.connect('http://localhost:4000');
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
        }
    }
    // componentDidMount() {
    //     /**
    //      * Get all the users data
    //      **/
    //     chatServices()
    //         .then((result) => {
    //             this.setState({
    //                 onlineUser: result.data.result
    //             })
    //             console.log("users", result.data.result);
    //         })
    //         .catch((error) => {
    //             alert(error)
    //         });
    //     /**
    //      * Get all users chat history to display
    //      **/
    //     userChatArray()
    //         .then((result) => {
    //             this.setState({
    //                 MsgArray: result.data.result
    //             })
    //             console.log("chat history is :", this.state.MsgArray);
    //         })
    //         .catch((error) => {
    //             alert(error);
    //         });
    //     const Sender = localStorage.getItem('Sender');
    //     socket.on(Sender, (res) => {
    //         console.log("responce in dash board========>", res);
    //         const msg = this.state.msg;
    //         msg.push(res);
    //         this.setState({ msg: msg });
    //         console.log("this set msg====>", this.state.msg);
    //     })
    // }
    /**
     * it will takes the current typed message
     */
    handleMessage = (e) => {
        this.setState({ message: e.target.value });
    }
    /**
     * it will submit the send icon and display the message to selected user
     */
    // handleSubmit = (event) => {
    //     event.preventDefault();
    //     /**
    //      * Get the sender who has login to the application
    //      **/
    //     const Sender = localStorage.getItem('Sender');
    //     this.setState({ Sender: Sender })
    //     console.log('Sender is :', Sender);
    //     console.log("Selected receiver: ", this.state.Receiver);
    //     //chatDisplay(Sender, this.state.Receiver, this.state.message);
    //     const data = {
    //         senderId: Sender,
    //         recieverId: this.state.Receiver,
    //         message: this.state.message,
    //     }
    //     socket.emit('new_msg', data);
    //     this.setState({
    //         message: '',
    //         anchorEl: null
    //     });
    //     //  this.setState({ MsgDisplay: this.state.message })
    //     // this.handleClick = this.handleClick.bind(this);
    // }
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
        this.props.props.history.push("/login");
    }
    render() {


        const msg = this.state.MsgArray.map((key) => {
            return (
                <div >
                    {key.senderId === localStorage.getItem('Sender') ? (
                        key.senderId === this.state.Receiver ?
                            (
                                <div className="sender-div">
                                    <label>{key.senderId}:</label>
                                    <div>{key.message}</div>
                                    {/* <MenuItem >{key.senderId}:{key.message}</MenuItem> */}
                                </div>) : (null)
                    ) : (null)}
                    {key.senderId === this.state.Receiver ? (
                        <div className="receiver-div">
                            {/* <MenuItem >{key.senderId}:{key.message}</MenuItem> */}
                            <label> {key.senderId}:</label>
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
        const msgdis = this.state.msg.map((key) => {
            console.log("key.senderId === this.state.senderId", key.senderId === this.state.senderId);
            return (
                <div>
                    {key.senderId === this.state.Sender ?
                        (<div className="sender-div">
                            <label>{key.senderId}:</label>
                            <div>{key.message}</div>
                            {/* <MenuItem >{key.senderId}:{key.message}</MenuItem> */}
                        </div>)
                        : (<div className="receiver-div">
                            <label>{key.senderId}:</label>
                            <div>{key.message}</div>
                        </div>)
                    }
                </div>
            )
        })
        return (
            <div>
                <AppBar position="static" align="center"><h1>Welcome TO ChatApp..!!!</h1>
                    <Button className="grow" color="inherit" onClick={this.handleLogout}>Logout</Button>
                </AppBar>
                <div>
                    <p><h4><u>user</u>:-{localStorage.getItem('Sender')}</h4></p>
                    <div className="dashboard">
                        <label><u>Users List:-</u></label>
                        <div>
                            {loginUsers}
                        </div>
                    </div>
                    {/* Display the messages on screen */}
                    <div className="msgdisplay">
                        <center>To:-  {this.state.Receiver}</center>
                        {msg}
                        {msgdis}
                        {/* <MessageDisplay
                            MsgArray={this.state.MsgArray}
                            recieverId={this.state.Receiver}
                        /> */}
                    </div>
                </div>
                <div className="containerButton">
                    <TextField
                        type="textfield"
                        value={this.state.message}
                        placeholder="Write a Message ................."
                        onChange={this.handleMessage}
                        variant="filled"
                        InputProps={{
                            disableUnderline: true
                        }}
                    />
                </div>
                <div>
                    <Button
                        id="send"
                        type="submit"
                        variant="contained"
                        color="primary"
                        title="click on send"
                        onClick={this.handleSubmit}>
                        send
                        </Button>
                </div>
            </div>
        )
    }
}

