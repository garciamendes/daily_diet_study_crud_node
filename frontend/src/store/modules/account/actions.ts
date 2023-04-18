// Project
import { ICallback } from '../../utils/types'

// Local
import {
  IAccountData,
  IAccountLogin,
  IAccountType
} from './types'

export const createUser = (data: IAccountData, callback?: ICallback | (() => void)) => ({
  type: IAccountType.CREATE_USER,
  payload: data,
  callback
})

export const loginUser = (data: IAccountLogin, callback?: ICallback | (() => void)) => ({
  type: IAccountType.LOGIN_USER,
  payload: data,
  callback
})