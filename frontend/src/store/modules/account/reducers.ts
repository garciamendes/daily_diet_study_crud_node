// // Third party
import produce from 'immer'

// Local
import { IAccountType, IUserData } from './types'

const default_state_create_user = {}
export const createUserReducer = (state = default_state_create_user, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case IAccountType.CREATE_USER_SUCCESS:
        return action.payload
      default:
        return draft
    }
  })
}

const default_state_login_user: IUserData = {
  id: '', name: '', email: ''
}
export const loginUserReducer = (state = default_state_login_user, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case IAccountType.LOGIN_USER_SUCCESS:
        return action.payload
      default:
        return draft
    }
  })
}