// Third party
import { AxiosError, AxiosResponse } from 'axios'
import { has } from 'lodash'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { toast } from 'react-hot-toast'

// Project
import { AuthTokenHeader, api } from '../../../services/api'

// Local
import { IAccountType, createUserType, loginUserType } from './types'

export function* createUserSagas({ payload, callback }: createUserType) {
  try {
    const response: AxiosResponse = yield call(api.post, '/register', payload)

    if (response.status === 200) {
      yield put({
        type: IAccountType.CREATE_USER_SUCCESS
      })
    }

    toast.success(response.data)
    if (typeof (callback) == 'object' && has(callback, 'onFinish'))
      callback.onFinish?.()

  } catch (error) {
    toast.error('Erro ao tentar criar uma conta')

    if (typeof (callback) == 'object' && has(callback, 'onError'))
      callback.onError?.()
  }

  if (typeof (callback) == 'function')
    callback?.()
  else if (typeof (callback) == 'object' && has(callback, 'onFinally'))
    callback.onFinally?.()
}

export function* loginUserSagas({ payload, callback }: loginUserType) {
  try {
    const response: AxiosResponse = yield call(api.post, '/login', payload)

    if (response.status === 200) {
      yield put({
        type: IAccountType.LOGIN_USER_SUCCESS,
        payload: response.data
      })

      sessionStorage.setItem('token', response.data.token)
      sessionStorage.setItem('user', JSON.stringify(response.data.user))
    }

    if (typeof (callback) == 'object' && has(callback, 'onFinish'))
      callback.onFinish?.()

  } catch (error: any) {
    toast.error('Erro ao tentar fazer o login')
    toast.error(error['message'])

    if (typeof (callback) == 'object' && has(callback, 'onError'))
      callback.onError?.()
  }

  if (typeof (callback) == 'function')
    callback?.()
  else if (typeof (callback) == 'object' && has(callback, 'onFinally'))
    callback.onFinally?.()
}

export default all([
  takeLatest(IAccountType.CREATE_USER, createUserSagas),
  takeLatest(IAccountType.LOGIN_USER, loginUserSagas),
])