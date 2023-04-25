// Third party
import { all } from 'redux-saga/effects'

// Local
import account_sagas from './account/sagas'
import snack_sagas from './snack/sagas'

export default function* rootSagas() {
  return yield all([
    account_sagas,
    snack_sagas,
  ])
}