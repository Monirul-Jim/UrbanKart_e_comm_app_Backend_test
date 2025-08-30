/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';
import { TUserRegistration } from '../Register/register.interface';

export interface UserModel extends Model<TUserRegistration> {
  isUserExistsByCustomId(id: string): Promise<TUserRegistration | null>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number
  ): boolean;
}
export type TUserRole = keyof typeof USER_ROLE;