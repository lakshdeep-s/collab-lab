import bcrypt from "bcryptjs"
import appAssert from "../utils/appAssert.js"
import { UserModel } from "../model/user.model.js"
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../constants/HTTPCodes.js"
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/tokenUtils.js"

export const loginService = async (userData) => {
  const { email, password } = userData

  const existingUser = await UserModel.findOne({ email: email })
  appAssert(existingUser, "Invalid credentials", BAD_REQUEST, "INVALID_CREDENTIALS")

  const isPasswordValid = await bcrypt.compare(password, existingUser.password)
  appAssert(isPasswordValid, "Invalid credentials", BAD_REQUEST, "INVALID_CREDENTIALS")

  existingUser.lastLogin = new Date();
  await existingUser.save();

  const accessToken = generateAccessToken({userId: existingUser._id})
  const refreshToken = generateRefreshToken({userId: existingUser._id})
  appAssert(accessToken && refreshToken, "Something went wrong while generating tokens", INTERNAL_SERVER_ERROR, "TOKEN_ERROR")

  return {
    message: "User Logged in Successfully",
    user: {
        userId: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        lastLogin: existingUser.lastLogin
    },
    accessToken,
    refreshToken
  }
}
