// Third party
import { combineReducers } from 'redux'

// Local
import { createUserReducer, loginUserReducer } from './account/reducers'
import {
  createSnackReducer,
  fetchListSnackReducer,
  fetchSummaryReducer
} from './snack/reducers'

export default combineReducers({
  create_user: createUserReducer,
  user_login: loginUserReducer,

  // snack
  create_snack: createSnackReducer,
  fetch_list_snack: fetchListSnackReducer,
  fetch_summary: fetchSummaryReducer,
})