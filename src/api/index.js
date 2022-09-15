import { create } from "axios";

export const api = create({
    baseURL: process.env.REACT_APP_BASE_API,
    headers: {
        Authorization:
            "Basic VlNUVV9DT05GRVJFTkNFX0NMSUVOVDpWU1RVX0NPTkZFUkVOQ0VfQ0xJRU5U",
        "Content-Type": "application/json",
    },
});

export const api2 = create({
    baseURL: process.env.REACT_APP_BASE_API_2,
    // headers: {
    //     Authorization:
    //         "Basic VlNUVV9DT05GRVJFTkNFX0NMSUVOVDpWU1RVX0NPTkZFUkVOQ0VfQ0xJRU5U",
    //     "Content-Type": "application/json",
    // },
});

api.interceptors.response.use((response) => response.data);
api2.interceptors.response.use((response) => response.data);
