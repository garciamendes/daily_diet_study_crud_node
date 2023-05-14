// Third party
import { combineReducers } from 'redux'

// Local
import { createUserReducer, loginUserReducer } from './account/reducers'
import {
  createSnackReducer,
  fetchDetailSnackReducer,
  fetchListSnackReducer,
  fetchSummaryReducer
} from './snack/reducers'

export default combineReducers({
  create_user: createUserReducer,
  user_login: loginUserReducer,

  // snack
  create_snack: createSnackReducer,
  fetch_list_snack: fetchListSnackReducer,
  fetch_detail_snack: fetchDetailSnackReducer,
  fetch_summary: fetchSummaryReducer,
})