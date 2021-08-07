export class NetworkError extends Error {
    constructor(message) {
        super(message);
        this.name = "NetworkError";
        this.code = "ENETWORK"
    }
}
export class ServerError extends Error {
    constructor(message) {
        super(message);
        this.name = "ServerError";
        this.code = "ESERVER"
    }
}
export class InternalError extends Error {
    constructor(code, message) {
        super(message);
        this.name = "InternalError";
        this.code = code
    }
}
