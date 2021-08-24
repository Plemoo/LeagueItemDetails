import axios from "axios";

export async function getDataFromMiddleware() {
    const response = await axios(getBackendServer() + "/api/itemsByCategory");
    return response.data;
}
export async function getAllItemsFromMiddleware() {
    const response = await axios(getBackendServer() + "/api/allItems");
    return await response.data;
}

export async function getPatches() {
    const response = await axios(getBackendServer() + "/api/getPatches");
    return await response.data;
}

export async function postData(url, patchStr) {
    const response = await axios(getBackendServer() + url, { params: { patch: patchStr } })
    return response.data;
}

export async function getStuff() {
    const response = await axios(getBackendServer() + "/api/customPatch");
    // console.log(response.data)
    return await response.data;
}

function getBackendServer() {
    //return "http://localhost:3080"
    return "https://www.league-item-details.com";
}