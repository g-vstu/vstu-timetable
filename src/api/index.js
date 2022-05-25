import { create } from "axios";

export const api = create({
    baseURL: process.env.REACT_APP_BASE_API,
    headers: {
        Authorization:
            "Basic VlNUVV9DT05GRVJFTkNFX0NMSUVOVDpWU1RVX0NPTkZFUkVOQ0VfQ0xJRU5U",
        "Content-Type": "application/json",
    },
});

// export const common = create({
//     baseURL: "http://192.168.11.252:8082",
//     headers: {},
// });

api.interceptors.response.use((response) => response.data);
