
import axios from 'axios';
import { getToken } from '../util/CookieUtil';

//         

export default axios.create({
    headers: {
        common: {
            'Authorization': 'Bearer ' + getToken(),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
        }
    },
    baseURL: 'http://localhost:8081'
});

export const nonSecuredPollingApi = () => {
    return axios.create({
        headers: {
            common: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
            }
        },
        baseURL: 'http://localhost:8081'
    });
}


