import http from "./httpService.js";

const apiEndpoint = "http://localhost:3000/coin";

export function saveCoin(coin) {
    return http.post(apiEndpoint, {
        name: coin.name,
        country: coin.country,
        shortText: coin.shortText,
        text: coin.text,
        quality: "BU",
        weight: coin.weight,
        composition: coin.metal,
        price: coin.price,
        year: coin.year,
        type: coin.type
    });
};
