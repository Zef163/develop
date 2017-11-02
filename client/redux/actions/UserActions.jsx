/**
 * Get info of one user
 * @param id
 * @returns {{type: string, text: *, date: number}}
 */
export function getOneUser (id, params) {
    console.log("getOneUser", id, params);
    return {
        "type": "GET_ONE_USER",
        "id": id,
        "date": Date.now()
    };
}