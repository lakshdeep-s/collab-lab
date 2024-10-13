import { INTERNAL_SERVER_ERROR ,BAD_REQUEST, UNAUTHORIZED} from "../constants/HTTPCodes.js"
import { AppError } from "../utils/AppError.js"
import config from "../config/index.js"

const handleAppError = (res,err)  => {
  return res.status(err.statusCode).json({
    message: err.message,
    errorCode: err.errorCode
  })
}

const errorHandler = (err, req, res, next) => {
  // Log the error on the server console (NEED BETTER LOGGING IN PRODUCTION)
  console.error(
    `Error on ${req.path}:`,
    JSON.stringify(
      {
        message: err.message,
        appErrorCode: err.appErrorCode,
      },
      null,
      2
    )
  )

  if (req.path === "/auth/refresh"){
    res.clearCookie("refreshToken", {
      ...config.refreshTokenCookieOptions,
      maxAge: 0,
    })
    res.clearCookie("accessToken", {
      ...config.accessTokenCookieOptions,
      maxAge: 0,
    })
  }

  if (err instanceof AppError) {
    return handleAppError(res, err)
  }

  const status = err.statusCode || INTERNAL_SERVER_ERROR
  const message =
    process.env.NODE_ENV === "production"
      ? "Something went wrong"
      : err.message || "Internal Server Error"

  // General Error Response to user
  res.status(status).json({message})
}

export default errorHandler
