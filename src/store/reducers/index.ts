/**
 * reducer汇总
 */
import { combineReducers } from 'redux'
import toplistReducer from './toplistReducer'
import { IRootReducer } from 'store'

const reducer = combineReducers<IRootReducer>({
  toplistReducer
})

export default reducer
