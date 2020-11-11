import jwtDecode from "jwt-decode";
import http from "./httpService.js";

const apiEndpoint = "http://localhost:3000/login";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(username, password) {
    const { data: jwt } = await http.post(apiEndpoint, { username, password });
    localStorage.setItem(tokenKey, jwt);
}
export function loginWithJwt(jwt) {
    localStorage.setItem(tokenKey, jwt);
}
export function logout() {
    localStorage.removeItem(tokenKey);
}
export function init() { }
export function log(error) {
    console.error(error);
}
export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey);
        const account = jwtDecode(jwt);
        return account;
    } catch (ex) {
        return null;
    }
}
export function getJwt() {
    return localStorage.getItem(tokenKey);
}
export default {
    login,
    loginWithJwt,
    logout,
    init,
    log,
    getCurrentUser,
    getJwt
};
