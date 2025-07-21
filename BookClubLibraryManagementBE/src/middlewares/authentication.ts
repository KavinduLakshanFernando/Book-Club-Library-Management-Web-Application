import { Request, Response, NextFunction } from "express"
import jwt, { JwtPayload, TokenExpiredError, JsonWebTokenError } from "jsonwebtoken"
import { APIError } from "../errors/ApiError"

// Middleware to authenticate JWT access token
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers["authorization"] // express automatically convert this to lowercase
    const token = authHeader && authHeader.split(" ")[1] // Expect "Bearer TOKEN"

    if (!token) {
      return next(new APIError(401, "Access token missing"))
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, decoded) => {
      console.log("process.env.ACCESS_TOKEN_SECRET", process.env.ACCESS_TOKEN_SECRET)
      if (err) {
        if (err instanceof TokenExpiredError) {
          throw next(new APIError(403, "Access token expired"))
        } else if (err instanceof JsonWebTokenError) {
          console.log("Hit here", err)
          throw next(new APIError(403, "Invalid access token"))
        } else {
          throw next(new APIError(500, "Could not authenticate token"))
        }
      }

      if (!decoded || typeof decoded === "string") {
        throw next(new APIError(401, "Invalid token payload"))
      }

      next()
    })
  } catch (err) {
    next(err)
  }
}
