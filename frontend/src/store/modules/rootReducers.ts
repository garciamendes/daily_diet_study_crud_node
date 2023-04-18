// Third party
import { combineReducers } from 'redux'

// Local
import { createUserReducer } from './account/reducers'

export default combineReducers({
  create_user: createUserReducer
})