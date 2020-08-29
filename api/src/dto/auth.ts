import { ShippingAddress } from "../models/ShippingAddress";
import { Role } from "../models/role";

export interface RegisterDto{
  username: string,
  password: string,
  firstName: string,
  lastName: string,
  email: string,
  shippingAddress?: ShippingAddress,
  role: Role
};

export interface LoginDto{
  username: string,
  password: string
};

export interface ChangePasswordDto{
  username: string,
  oldPassword: string,
  newPassword: string
};

export interface CustomLoginResponse{
  success: boolean;
  status: number;
  token?: string,
  role?: Role
}