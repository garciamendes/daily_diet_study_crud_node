// // Third party
import produce from 'immer'

// Local
import { IListSnack, ISnackTypes, ISummary } from './types'

const default_state = {}
export const createSnackReducer = (state = default_state, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case ISnackTypes.CREATE_SNACK_SUCCESS:
        return action.payload
      default:
        return draft
    }
  })
}

const default_state_list_snack: IListSnack = {}
export const fetchListSnackReducer = (state = default_state_list_snack, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case ISnackTypes.FETCH_LIST_SNACK_SUCCESS:
        draft = action.payload
        return draft
      default:
        return draft
    }
  })
}

const default_state_summary: ISummary = {
  dietCount: null, dietPercent: null, dietSequence: null,
  noDietCount: null, totalSnack: null
}
export const fetchSummaryReducer = (state = default_state_summary, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case ISnackTypes.FETCH_SUMMARY_SUCCESS:
        draft = action.payload
        return draft
      default:
        return draft
    }
  })
}