import * as Fetch from '../../utils/fetch';
import * as ConstansApi from '../../utils/constants_api';
const myHeaders = new Headers();

export function validateToken(idToken) {
    myHeaders.set("Content-Type", "application/json;charset=UTF-8");
    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };
    const END_POINT = ConstansApi.URL_API_TOKEN_VALIDATE(idToken);
    return Fetch.fetchWithTimeout(END_POINT, requestOptions);
}
