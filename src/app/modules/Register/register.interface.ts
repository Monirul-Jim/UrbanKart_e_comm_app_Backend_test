export type TUserRegistration = {
  firstName: string;
  lastName: string;
  email: string;
  role: "super_admin"|"admin" | "user";
  status: "active" | "blocked";
  isDeleted: boolean;
  password: string;
};