import appAssert from "../utils/appAssert.js"
import { BAD_REQUEST, OK, UNAUTHORIZED } from "../constants/HTTPCodes.js"
import config from "../config/index.js"
import { registerService } from "../services/register.service.js"
import { loginService } from "../services/login.service.js"
import { verifyToken } from "../utils/tokenUtils.js"
import { refreshService } from "../services/refresh.service.js"
import { AppErrorCode } from "../constants/AppErrorCodes.js"

export const registerController = async (req, res) => {
  const { username, email, password } = req.body

  appAssert(
    username && email && password,
    "All fields are required",
    BAD_REQUEST
  )

  const result = await registerService({ username, email, password })

  res.cookie(
    "refreshToken",
    result.refreshToken,
    config.refreshTokenCookieOptions
  )
  res.cookie("accessToken", result.accessToken, config.accessTokenCookieOptions)

  return res.status(201).json({
    message: result.message,
    user: result.user,
  })
}

export const loginController = async (req, res) => {
  const { email, password } = req.body

  appAssert(email && password, "All fields are required", BAD_REQUEST)

  const result = await loginService({ email, password })

  res.cookie(
    "refreshToken",
    result.refreshToken,
    config.refreshTokenCookieOptions
  )
  res.cookie("accessToken", result.accessToken, config.accessTokenCookieOptions)

  return res.status(200).json({
    message: result.message,
    user: result.user,
  })
}

export const logoutController = async (req, res) => {
  const accessToken = req.cookies.accessToken

  appAssert(
    accessToken,
    "Access token not found",
    UNAUTHORIZED,
    AppErrorCode.AccessTokenNotFound
  )

  const decoded = verifyToken(accessToken)

  res.clearCookie("refreshToken", {
    ...config.refreshTokenCookieOptions,
    maxAge: 0,
  })
  res.clearCookie("accessToken", {
    ...config.accessTokenCookieOptions,
    maxAge: 0,
  })

  return res.status(OK).json({
    message: "User logged out successfully",
  })
}

export const refreshHandler = async (req, res) => {
  const refreshToken = req.cookies.refreshToken

  appAssert(
    refreshToken,
    "Refresh token not found",
    UNAUTHORIZED,
    AppErrorCode.RefreshTokenNotFound
  )

  const accessToken = await refreshService(refreshToken)

  res.cookie("accessToken", accessToken, config.accessTokenCookieOptions)

  return res.status(OK).json({
    message: "Access token refreshed successfully",
  })
}
