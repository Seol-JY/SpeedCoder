import { SET_WRONGCHR } from "./types"
export const setWrongchr = (val) => {
    return {
        type: SET_WRONGCHR,
        value: val
    }
}
