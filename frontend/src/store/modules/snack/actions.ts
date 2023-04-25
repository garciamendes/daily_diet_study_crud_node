// Project
import { ICallback } from '../../utils/types'

// Local
import { ISnack, ISnackTypes } from './types'

export const createSnack = (data: ISnack, callback?: ICallback | (() => void)) => ({
  type: ISnackTypes.CREATE_SNACK,
  payload: data,
  callback
})

export const fetchListSnack = (callback?: ICallback | (() => void)) => ({
  type: ISnackTypes.FETCH_LIST_SNACK,
  callback
})

export const fetchSummary = (callback?: ICallback | (() => void)) => ({
  type: ISnackTypes.FETCH_SUMMARY,
  callback
})
