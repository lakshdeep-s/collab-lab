import { NOT_FOUND, OK } from "../constants/HTTPCodes.js"
import { UserModel } from "../model/user.model.js"
import appAssert from "../utils/appAssert.js"

export const userController = async (req, res) => {
  const user = await UserModel.findById(req.userId)
  appAssert(user, NOT_FOUND, "User not found")

  return res.status(OK).json({
      userId: user._id,
      username: user.username,
      email: user.email,
      lastLogin: user.lastLogin,
  })
}
