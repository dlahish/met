import React from 'react'
import Routes from './config/routes'
import store from './config/store'
import  { Provider } from 'react-redux'
import Rx from 'rxjs'

export default function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  )
}
