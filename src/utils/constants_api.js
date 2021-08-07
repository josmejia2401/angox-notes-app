const protocol = window.location.protocol ? `${window.location.protocol}//` : "http://";
const hostname = window.location.hostname;
const current_port = window.location.port;
const current_hostname = window.location.port !== undefined && window.location.port !== null && window.location.port !== "" ? `${protocol}${hostname}:${current_port}` : `${protocol}${hostname}`;

export const URL_API_NOTES = window.location.port !== "8081" && hostname.indexOf("localhost") !== -1 ? `${protocol}${hostname}:15040` : current_hostname;
export const URL_API_TOKEN = window.location.port !== "8081" && hostname.indexOf("localhost") !== -1 ? `${protocol}${hostname}:10000` : current_hostname;

export const PATH_SIGN_IN = "/web/security/sign-in";
export const PATH_SIGN_UP = "/web/security/sign-up";
export const PATH_HOME = "/web/notes/home";
export const PATH_NOTE_ADD = "/web/notes/add";
export const PATH_NOTE_EDIT = "/web/notes/edit";

export const URL_API_TOKEN_VALIDATE = (id) => { return `${URL_API_TOKEN}/api/v1/tokens/?token=${id}` };
export const URL_API_NOTES_CREATED = () => { return `${URL_API_NOTES}/api/v1/notes/` };
export const URL_API_NOTES_UPDATE = (id) => { return `${URL_API_NOTES}/api/v1/notes/${id}` };
export const URL_API_NOTES_DELETE = (id) => { return `${URL_API_NOTES}/api/v1/notes/${id}` };
export const URL_API_NOTES_GET = (id) => { return `${URL_API_NOTES}/api/v1/notes/${id}` };
export const URL_API_NOTES_GET_ALL = (accountId) => { return `${URL_API_NOTES}/api/v1/notes/?accountId=${accountId}` };