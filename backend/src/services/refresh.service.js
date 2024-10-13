import { generateAccessToken, verifyToken } from "../utils/tokenUtils.js"
import appAssert from "../utils/appAssert.js"
import { INTERNAL_SERVER_ERROR, UNAUTHORIZED } from "../constants/HTTPCodes.js"
import { AppErrorCode } from "../constants/AppErrorCodes.js"

export const refreshService = async (refreshToken) => {
    const decoded = verifyToken(refreshToken, {isRefreshToken: true})
    appAssert(decoded, "Invalid refresh token", UNAUTHORIZED, AppErrorCode.InvalidRefreshToken)

    const accessToken = generateAccessToken({userId: decoded.userId})

    return accessToken
}