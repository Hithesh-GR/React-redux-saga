/******************************************************************************
 *  @Purpose        : To create chat services that will send the incoming data 
                    to server and save that data to database and display the 
                    specific user messages
 *  @file           : chatServices.js    
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 02-02-2019
 ******************************************************************************/
import axios from 'axios';
/**
 * 
 * @param {*used to get AllUsers data  } data 
 */
export function chatServices(data) {
    return axios('/getAllUsers',
        {
            method: "GET",
            data: data
        })
}
/**
 * 
 * @param {*get AllChats data} data 
 */
export function userChatArray(data) {
    return axios('/getAllChats', {
        method: "GET",
        data: data
    })
}