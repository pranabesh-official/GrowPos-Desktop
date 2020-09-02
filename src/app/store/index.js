import { createStore , combineReducers , applyMiddleware} from 'redux'
import changeState from './Reducer/sidebar'
import thunk from 'redux-thunk'
import DataStore from './Reducer/DataStore'
import SyncData from './Reducer/syncManeger'
// import { composeWithDevTools } from 'redux-devtools-extension';
import Shop from './Reducer/Shop'
import {createLogger} from 'redux-logger'



const logger = createLogger();
const middleware = [thunk, logger]

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}



const rootReducer = combineReducers({
  changeState,
  DataStore,
  SyncData,
  Shop
})



const store = createStore(
  rootReducer,
  // composeWithDevTools(applyMiddleware(...middleware)),
  applyMiddleware(...middleware)
  
)
export default store