import * as Fetch from '../../utils/fetch';
import * as ConstansApi from '../../utils/constants_api';
const myHeaders = new Headers();

export function created(dataAsJson, s_accountId = null, s_token = null) {
    myHeaders.set("Content-Type", "application/json;charset=UTF-8");
    myHeaders.set("Authorization", "Bearer " + s_token);
    myHeaders.set("accountId", s_accountId);
    const raw = dataAsJson;
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw
    };
    const END_POINT = ConstansApi.URL_API_NOTES_CREATED();
    return Fetch.fetchWithTimeout(END_POINT, requestOptions);
}