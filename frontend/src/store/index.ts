// Third part
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'

// Local
import rootReducers from './modules/rootReducers'
import rootSagas from './modules/rootSagas'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducers,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware)
  )
)

sagaMiddleware.run(rootSagas)
export default store