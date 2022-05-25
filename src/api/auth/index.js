import { api } from "..";

export function getToken(data) {
    return api.post("/authorization/token?grant_type=password", data);
}
