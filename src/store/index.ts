/**
 * redux入口
 */
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import { IToplistState } from './states'
import reducer from './reducers';

interface IRootReducer {
  toplistReducer: IToplistState
}

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store
export type { IRootReducer }