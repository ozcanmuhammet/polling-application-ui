import Cookies from 'js-cookie';
import decode from 'jwt-decode';
import history from '../history';


//Token
export const getToken = () => {
    return Cookies.get("token");
}

export const setToken = (token) => {
    Cookies.set('token', token, { expires: 60, sameSite: 'strict' });
}

export const removeToken = () => {
    try {
        return Cookies.remove("token");
    } catch (error) { console.log(error) }
}

export const getUserId = () => {
    try {
        let decodedToken = decode(Cookies.get("token"));
        return decodedToken.USER_ID;
    } catch (error) { console.log(error) }
}

export const getUserName = () => {
    try {
        let decodedToken = decode(Cookies.get("token"));
        return decodedToken.USER_NAME;
    } catch (error) { console.log(error) }
}

export const getAuthorities = () => {
    try {
        let decodedToken = decode(Cookies.get("token"));
        return decodedToken.AUTHORITIES;
    } catch (error) { console.log(error) }
}

export const checkLogin = () => {
    if (getToken() === undefined || getToken() === null) {
        history.push('/login');
    }
}