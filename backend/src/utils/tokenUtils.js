import jsonwebtoken from "jsonwebtoken"
import config from "../config/index.js"
import { AppError } from "./AppError.js"
import { UNAUTHORIZED } from "../constants/HTTPCodes.js"
import { AppErrorCode } from "../constants/AppErrorCodes.js"
import crypto from "node:crypto"

export const accessTokenOptions = {
    expiresIn: "20m"
}
export const refreshTokenOptions = {
    expiresIn: "2h",
}

export const generateAccessToken = (payload) => {
    return jsonwebtoken.sign(payload, config.accessTokenSecret, accessTokenOptions)
}

export const generateRefreshToken = (payload) => {
    return jsonwebtoken.sign(payload, config.refreshTokenSecret, refreshTokenOptions)
}

export const verifyToken = (token, options = {}) => {
    const {isRefreshToken = false} = options
    const secret = isRefreshToken ? config.refreshTokenSecret : config.accessTokenSecret

    try {
        const decoded = jsonwebtoken.verify(token, secret)
        return decoded
    } catch (error) {
        let message = "Invalid Token"
        let statusCode = UNAUTHORIZED
        let appErrorCode = AppErrorCode.InvalidAccessToken

        if (error instanceof jsonwebtoken.TokenExpiredError) {
            message = "Token has expired"
            appErrorCode = AppErrorCode.AccessTokenExpired
        } else if (error instanceof jsonwebtoken.JsonWebTokenError) {
            message = "Invalid token signature"
            appErrorCode = AppErrorCode.InvalidAccessToken
        }

        throw new AppError(message, statusCode, appErrorCode)
    }
}

export const generateInvitationToken = () => {
    return crypto.randomBytes(32).toString('hex')
}