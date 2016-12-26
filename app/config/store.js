import {persistStore, autoRehydrate, purgeStoredState} from 'redux-persist'
import {applyMiddleware, createStore, compose} from 'redux'
import {AsyncStorage} from 'react-native'
import thunk from 'redux-thunk'
import { createEpicMiddleware } from 'redux-observable'
import rootReducer from '../reducers'
import rootEpic from '../epics'
import createLogger from 'redux-logger'
const logger = createLogger()

const epicMiddleware = createEpicMiddleware(rootEpic);

const store = createStore(rootReducer, compose(
	applyMiddleware(thunk, epicMiddleware, logger),
	// applyMiddleware(thunk, epicMiddleware),
	autoRehydrate()
));

persistStore(store, {storage: AsyncStorage})

// purgeStoredState({storage: AsyncStorage}).then(() => {
//   console.log('purge of someReducer completed')
// }).catch(() => {
//   console.log('purge of someReducer failed')
// })

export default store;
