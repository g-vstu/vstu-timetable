import { api } from "..";

export function getSpecialitie() {
    return api.get("/common-info/specialities");
}
