import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import config from "../../config/config";
import { TUserRegistration } from "./register.interface";
import { UserModel } from "../User/user.interface";
const UserStatus = ["active", "blocked"];
const userRegistrationSchema = new Schema<TUserRegistration,UserModel>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["super_admin","admin", "user"],
    default: "user",
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: UserStatus,
    default: "active",
  },
  password: {
    type: String,
    required: true,
  },
});
userRegistrationSchema.pre('save', async function (next) {
  const user = this; // doc
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// set '' after saving password
userRegistrationSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userRegistrationSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await RegistrationModel.findOne({ id }).select('+password');
};

userRegistrationSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userRegistrationSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};


export const RegistrationModel = model<TUserRegistration,UserModel>(
  "RegisterUser",
  userRegistrationSchema
);