import { Request } from "express";
import IUser from "users/user.interface";

export default interface RequestWithUser extends Request {
  user: IUser;
}
