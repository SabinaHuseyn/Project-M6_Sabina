import http from "./httpService.js";

const apiEndpoint = "http://localhost:3000/register";

export function register(user) {
    return http.post(apiEndpoint, {
        username: user.username,
        password: user.password,
        name: user.name
    });
};
