// Project
import { ICallback } from '../../utils/types'

// Local
import { ISnack, ISnackTypes } from './types'

export const createSnack = (data: ISnack, callback?: ICallback | (() => void)) => ({
  type: ISnackTypes.CREATE_SNACK,
  payload: data,
  callback
})
export const updateSnack = (snack_id: string, data: ISnack, callback?: ICallback | (() => void)) => ({
  type: ISnackTypes.UPDATE_SNACK,
  payload: { snack_id, data },
  callback
})

export const deleteSnack = (snack_id: string, callback?: ICallback | (() => void)) => ({
  type: ISnackTypes.DELETE_SNACK,
  payload: { snack_id },
  callback
})

export const fetchListSnack = (callback?: ICallback | (() => void)) => ({
  type: ISnackTypes.FETCH_LIST_SNACK,
  callback
})
export const clearListSnack = () => ({
  type: ISnackTypes.CLEAR_LIST_SNACK,
})

export const fetchDetailSnack = (snack_id: string, callback?: ICallback | (() => void)) => ({
  type: ISnackTypes.FETCH_DETAIL_SNACK,
  payload: { snack_id },
  callback
})
export const clearDetailSnack = () => ({
  type: ISnackTypes.CLEAR_DETAIL_SNACK
})

export const fetchSummary = (callback?: ICallback | (() => void)) => ({
  type: ISnackTypes.FETCH_SUMMARY,
  callback
})
export const clearSummary = () => ({
  type: ISnackTypes.CLEAR_SUMMARY
})
