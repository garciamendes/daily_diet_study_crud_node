import { createUser, loginUser } from "./actions"

export enum IAccountType {
  CREATE_USER = 'CREATE_USER',
  CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS',

  LOGIN_USER = 'LOGIN_USER',
  LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS',
}

export interface IAccountData {
  name: string,
  email: string,
  password: string
}

export interface IAccountLogin extends Omit<IAccountData, 'name'> {}
export interface IUserData {
  id: string,
  name: string,
  email: string,
}

export type createUserType = ReturnType<typeof createUser>
export type loginUserType = ReturnType<typeof loginUser>