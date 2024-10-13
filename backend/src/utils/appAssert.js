import { AppError } from "./AppError.js"

export default function appAssert(condition, message, statusCode, appErrorCode = null) {
    if (!condition) {
        throw new AppError(message, statusCode, appErrorCode)
    }
}