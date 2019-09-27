/******************************************************************************
 *  @Purpose        : To create user services that will send the incoming data 
                    to server and save that data to database and at login, reset
                    password, forgotpassword time fetching correct information 
                    from database.
 *  @file           : userServices.js        
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 02-02-2019
 ******************************************************************************/
import axios from 'axios';
/**
 * 
 * @param {*used to send registered data to server} data 
 */
export function userRegister(data) {
    return axios.post('/registration', data);
}
/**
 * 
 * @param {*send login data to server} data 
 */
export function userLogin(data) {
    return axios.post('/login', data);
}
/**
 * 
 * @param {*send password data to server} Password 
 * @param {*used to generate token and that data is encrypted} token 
 */
export function resetPassword(Password, token) {
    return axios.post(`/resetpassword/${token}`,
        { 'Password': Password },
        { headers: { 'token': token } })
}
/**
 * 
 * @param {*send forgotPassword data to server} userName 
 */
export function forgotPassword(userName) {
    axios.post('/verifyUser',
        {
            'Email': userName,
        })
        .then(function (response) {
            console.log(response);
            alert(' Please check your email..')
        })
        .catch(function (err) {
            console.log(err);
            alert('User Not Found..');
        });
}
