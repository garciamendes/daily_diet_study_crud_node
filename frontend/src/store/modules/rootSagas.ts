// Third party
import { all } from 'redux-saga/effects'

// Local
import account_sagas from './account/sagas'

export default function* rootSagas() {
  return yield all([
    account_sagas,
  ])
}