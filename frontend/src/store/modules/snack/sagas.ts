// Third party
import { AxiosError, AxiosResponse } from 'axios'
import { has } from 'lodash'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { toast } from 'react-hot-toast'

// Project
import { AuthTokenHeader, api } from '../../../services/api'

// Local
import { ISnackTypes, createSnack, fetchDetailSnack, fetchListSnack, fetchSummary, updateSnack } from './types'

export function* createSnackSagas({ payload, callback }: createSnack) {
  try {
    const response: AxiosResponse = yield call(api.post, '/snack', payload, {
      headers: {
        Authorization: `Bearer ${AuthTokenHeader}`
      }
    })

    if (response.status === 201) {
      yield put({
        type: ISnackTypes.CREATE_SNACK_SUCCESS,
        payload: response.data
      })

      toast.success('Refeição cadastrada com sucesso')
    }

    if (typeof (callback) == 'object' && has(callback, 'onFinish'))
      callback.onFinish?.(response)

  } catch (error: any) {
    toast.error('Erro ao tentar cadastrar a refeição')
    toast.error(error['message'])

    if (typeof (callback) == 'object' && has(callback, 'onError'))
      callback.onError?.()
  }

  if (typeof (callback) == 'function')
    callback?.()
  else if (typeof (callback) == 'object' && has(callback, 'onFinally'))
    callback.onFinally?.()
}

export function* updateSnackSagas({ payload, callback }: updateSnack) {

  const { snack_id, data } = payload
  try {
    const response: AxiosResponse = yield call(api.patch, `/snack/${snack_id}`, data, {
      headers: {
        Authorization: `Bearer ${AuthTokenHeader}`
      }
    })

    if (response.status === 200) {
      yield put({
        type: ISnackTypes.UPDATE_SNACK_SUCCESS,
        payload: response.data
      })

      toast.success('Refeição atualizada com sucesso')
    }

    if (typeof (callback) == 'object' && has(callback, 'onFinish'))
      callback.onFinish?.(response)

  } catch (error: any) {
    toast.error('Erro ao tentar atualzar a refeição')

    if (typeof (callback) == 'object' && has(callback, 'onError'))
      callback.onError?.()
  }

  if (typeof (callback) == 'function')
    callback?.()
  else if (typeof (callback) == 'object' && has(callback, 'onFinally'))
    callback.onFinally?.()
}

export function* fetchListSnackSagas({ callback }: fetchListSnack) {
  try {
    const response: AxiosResponse = yield call(api.get, '/snack', {
      headers: {
        Authorization: `Bearer ${AuthTokenHeader}`
      }
    })

    if (response.status === 200) {
      yield put({
        type: ISnackTypes.FETCH_LIST_SNACK_SUCCESS,
        payload: response.data
      })
    }

    if (typeof (callback) == 'object' && has(callback, 'onFinish'))
      callback.onFinish?.()

  } catch (error: any) {
    toast.error('Erro ao tentar carregar a lista de refeições')
    console.error(error['message'])

    if (typeof (callback) == 'object' && has(callback, 'onError'))
      callback.onError?.()
  }

  if (typeof (callback) == 'function')
    callback?.()
  else if (typeof (callback) == 'object' && has(callback, 'onFinally'))
    callback.onFinally?.()
}

export function* fetchDetailSnackSagas({ payload, callback }: fetchDetailSnack) {
  try {
    const response: AxiosResponse = yield call(api.get, `/snack/${payload.snack_id}`, {
      headers: {
        Authorization: `Bearer ${AuthTokenHeader}`
      }
    })

    if (response.status === 200) {
      yield put({
        type: ISnackTypes.FETCH_DETAIL_SNACK_SUCCESS,
        payload: response.data
      })
    }

    if (typeof (callback) == 'object' && has(callback, 'onFinish'))
      callback.onFinish?.(response)

  } catch (error: any) {
    toast.error('Erro ao tentar carregar o detalhe da refeição')
    console.error(error['message'])

    if (typeof (callback) == 'object' && has(callback, 'onError'))
      callback.onError?.(error)
  }

  if (typeof (callback) == 'function')
    callback?.()
  else if (typeof (callback) == 'object' && has(callback, 'onFinally'))
    callback.onFinally?.()
}

export function* fetchSummarySagas({ callback }: fetchSummary) {
  try {
    const response: AxiosResponse = yield call(api.get, '/snack/summary', {
      headers: {
        Authorization: `Bearer ${AuthTokenHeader}`
      }
    })

    if (response.status === 200) {
      yield put({
        type: ISnackTypes.FETCH_SUMMARY_SUCCESS,
        payload: response.data
      })
    }

    if (typeof (callback) == 'object' && has(callback, 'onFinish'))
      callback.onFinish?.()

  } catch (error: any) {
    toast.error('Erro ao tentar carregar as estatísticas')

    if (typeof (callback) == 'object' && has(callback, 'onError'))
      callback.onError?.()
  }

  if (typeof (callback) == 'function')
    callback?.()
  else if (typeof (callback) == 'object' && has(callback, 'onFinally'))
    callback.onFinally?.()
}

export default all([
  takeLatest(ISnackTypes.CREATE_SNACK, createSnackSagas),
  takeLatest(ISnackTypes.UPDATE_SNACK, updateSnackSagas),
  takeLatest(ISnackTypes.FETCH_LIST_SNACK, fetchListSnackSagas),
  takeLatest(ISnackTypes.FETCH_DETAIL_SNACK, fetchDetailSnackSagas),
  takeLatest(ISnackTypes.FETCH_SUMMARY, fetchSummarySagas),
])