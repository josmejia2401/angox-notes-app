import * as Fetch from '../../utils/fetch';
import * as ConstansApi from '../../utils/constants_api';
const myHeaders = new Headers();

export function get_all(accountId, s_accountId = null, s_token = null) {
    myHeaders.set("Content-Type", "application/json;charset=UTF-8");
    myHeaders.set("Authorization", s_token);
    myHeaders.set("accountId", s_accountId);
    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };
    const END_POINT = ConstansApi.URL_API_NOTES_GET_ALL(accountId);
    return Fetch.fetchWithTimeout(END_POINT, requestOptions);
}

export function updated(id, dataAsJson, s_accountId = null, s_token = null) {
    myHeaders.set("Content-Type", "application/json;charset=UTF-8");
    myHeaders.set("Authorization", "Bearer " + s_token);
    myHeaders.set("accountId", s_accountId);
    const raw = dataAsJson;
    const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw
    };
    const END_POINT = ConstansApi.URL_API_NOTES_UPDATE(id);
    return Fetch.fetchWithTimeout(END_POINT, requestOptions);
}

export function deleted(id, s_accountId = null, s_token = null) {
    myHeaders.set("Content-Type", "application/json;charset=UTF-8");
    myHeaders.set("Authorization", "Bearer " + s_token);
    myHeaders.set("accountId", s_accountId);
    const requestOptions = {
        method: 'DELETE',
        headers: myHeaders
    };
    const END_POINT = ConstansApi.URL_API_NOTES_DELETE(id);
    return Fetch.fetchWithTimeout(END_POINT, requestOptions);
}