// appErrorCode is an optional parameter in the function parameters
export class AppError extends Error {
    constructor(message, statusCode, appErrorCode=null) {
        super(message)
        this.statusCode = statusCode
        this.appErrorCode = appErrorCode
    }
}
