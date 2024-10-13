import bcrypt from "bcryptjs"
import appAssert from "../utils/appAssert.js"
import { UserModel } from "../model/user.model.js"
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../constants/HTTPCodes.js"
import { generateAccessToken, generateRefreshToken } from "../utils/tokenUtils.js"


export const registerService = async (userData) => {
  const { username, email, password } = userData

  const existingUser = await UserModel.findOne({ email: email })
  appAssert(
    !existingUser,
    "User already exists",
    BAD_REQUEST,
    "DUPLICATE_DB_USER"
  )

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = await UserModel.create({
    username,
    email,
    password: hashedPassword,
  })

  appAssert(
    newUser,
    "Something went wrong while registering the user",
    INTERNAL_SERVER_ERROR
  )

  const accessToken = generateAccessToken({userId: newUser._id})
  const refreshToken = generateRefreshToken({userId: newUser._id})
  appAssert(accessToken && refreshToken, "Something went wrong while generating tokens", INTERNAL_SERVER_ERROR,"TOKEN_ERROR")

  return {
    message: "User Registered Successfully",
    user: {
        userId: newUser._id,
        username,
        email,
        lastLogin: newUser.lastLogin
    },
    accessToken,
    refreshToken
  }
}
