import { AppErrorCode } from "../constants/AppErrorCodes.js"
import { UNAUTHORIZED } from "../constants/HTTPCodes.js"
import appAssert from "../utils/appAssert.js"
import { verifyToken } from "../utils/tokenUtils.js"

const authenticate = (req, res, next) => {
  const accessToken = req.cookies.accessToken
  appAssert(
    accessToken,
    "Unauthorized",
    UNAUTHORIZED,
    AppErrorCode.InvalidAccessToken
  )

  const decoded = verifyToken(accessToken)
  appAssert(
    decoded,
    "Unauthorized",
    UNAUTHORIZED,
    AppErrorCode.InvalidAccessToken
  )

  req.userId = decoded.userId
  next()
}

export default authenticate
