import React from 'react';
import axios from 'axios';

export default class MyTopApicalls extends React.Component {
    

    static getMyTops = async () =>{
        const headers = {};

        let responseValue = [];
        await axios.get(
            'https://hist-fav-checkout.herokuapp.com/getTopFavs/start=1&num=10',
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