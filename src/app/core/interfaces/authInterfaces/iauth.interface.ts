export interface INewUser {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  area: string;
  city: string;
  password: string;
  password_confirmation: string;
}
export interface IOldUser {
  email: string;
  password: string;
}

export interface IResetUserPassword {
  email: string;
  token: string;
  password: string;
  password_confirmation: string;
}

export interface IRegisterResponse {
  message: string;
}

export interface UserLoginResponse {
  message: string;
  access_token: string;
  user: User;
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  city: string;
  area: string;
  email: string;
  email_verified_at: string;
  verification_token: any;
  verification_token_expires_at: any;
  reset_token: string;
  reset_token_expires_at: string;
  created_at: string;
  updated_at: string;
}

export interface JWTDecode {
  id: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
}

export interface Account {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  city: string;
  area: string;
  email: string;
  email_verified_at: string;
  verification_token: any;
  verification_token_expires_at: any;
  reset_token: string;
  reset_token_expires_at: string;
  created_at: string;
  updated_at: string;
}
