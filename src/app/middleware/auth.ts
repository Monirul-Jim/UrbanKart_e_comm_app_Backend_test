import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import catchAsync from "../utils/catchAsync";
import { TUserRole } from "../modules/User/user.interface";
import AppError from "../error/AppError";
import config from "../config/config";
import { RegistrationModel } from "../modules/Register/register.model";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // check if token is missing
    if (!token) {
      throw new AppError(401, "You are not authorized!");
    }

    // verify token
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;

    const { role, _id, iat } = decoded;

    // check if user exists
    const user = await RegistrationModel.isUserExistsByCustomId(_id);
    if (!user) {
      throw new AppError(404, "This user is not found!");
    }

    // check if user is deleted
    if (user.isDeleted) {
      throw new AppError(403, "This user is deleted!");
    }

    // check if user is blocked
    if (user.status === "blocked") {
      throw new AppError(403, "This user is blocked!");
    }

    // check if password was changed after token was issued
    if (
      (user as any).passwordChangedAt && // add this field in schema if needed
      RegistrationModel.isJWTIssuedBeforePasswordChanged(
        (user as any).passwordChangedAt,
        iat as number
      )
    ) {
      throw new AppError(401, "You are not authorized!");
    }

    // check if role is allowed
    if (requiredRoles.length && !requiredRoles.includes(role)) {
      throw new AppError(401, "You are not authorized!");
    }

    req.user = decoded as JwtPayload & { role: string };
    next();
  });
};

export default auth;
