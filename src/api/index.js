import { create } from "axios";

export const auth = create({
    baseURL: "http://192.168.11.252:8082/authorization",
    headers: {
        Authorization:
            "Basic VlNUVV9DT05GRVJFTkNFX0NMSUVOVDpWU1RVX0NPTkZFUkVOQ0VfQ0xJRU5U",
    },
});

auth.interceptors.response.use((response) => response.data);
