import { auth } from "..";

export function getToken(data) {
    return auth.post("/token?grant_type=password", data);
}
