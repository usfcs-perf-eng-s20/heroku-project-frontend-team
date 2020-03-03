import React from 'react';
import axios from 'axios';

export default class ProfileAPICalls extends React.Component {
    

    static getMyProfile = async (userid) =>{
        const headers = {};

        let responseValue = [];
        await axios.get(
            'https://gentle-spire-73113.herokuapp.com​/getUserInfo?userId=' + userid,
            {headers}
            ).then(response => {
                responseValue = response.data;
            })
            .catch(error => {
                console.log(error);
            }
        )

        return responseValue;
    } 

    
}