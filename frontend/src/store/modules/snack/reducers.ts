// // Third party
import produce from 'immer'

// Local
import { IListSnack, ISnack, ISnackTypes, ISummary } from './types'

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

const default_state_list_snack: IListSnack = {
  results: {},
  dietPercent: null
}
export const fetchListSnackReducer = (state = default_state_list_snack, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case ISnackTypes.FETCH_LIST_SNACK_SUCCESS:
        draft = action.payload
        return draft
      case ISnackTypes.CLEAR_LIST_SNACK:
        return default_state_list_snack
      default:
        return draft
    }
  })
}

const default_state_detail_snack: ISnack = {
  date: '', description: '', hour: '',
  is_diet: null, name: '', id: ''
}
export const fetchDetailSnackReducer = (state = default_state_detail_snack, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case ISnackTypes.FETCH_DETAIL_SNACK_SUCCESS:
      case ISnackTypes.UPDATE_SNACK_SUCCESS:
        console.log(action.payload)
        draft = action.payload
        return draft
      case ISnackTypes.CLEAR_DETAIL_SNACK:
        return default_state_detail_snack
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
      case ISnackTypes.CLEAR_SUMMARY:
        return default_state_summary
      default:
        return draft
    }
  })
}