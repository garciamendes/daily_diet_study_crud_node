// React
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

// Third party
import { Toaster } from 'react-hot-toast'

// Local
import { App } from './App'
import store from './store'
import { GlobalStyle } from './static/styles/global'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <GlobalStyle />
    <Toaster
      position="top-right"
      reverseOrder={false}
    />
    <App />
  </Provider>
)
