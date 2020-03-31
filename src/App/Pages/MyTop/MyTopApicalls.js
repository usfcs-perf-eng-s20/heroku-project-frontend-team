import React from 'react';
import axios from 'axios';

export default class MyTopApicalls extends React.Component {
    

    static getMyTops = async () =>{
        const headers = {};

        let responseValue = [];
        await axios.get(
            'https://hist-favs-checkout.herokuapp.com/getTopFavs?page=0&nums=10',
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

    static getTopUsers = async (category) =>{
        const headers = {};

        let responseValue = [];
        await axios.get(
            `https://hist-favs-checkout.herokuapp.com/getTopUsers?selected=favs&page=0&nums=10`,
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