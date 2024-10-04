import { applyMiddleware, combineReducers, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { todosReducer } from './reducers';

const reducer = combineReducers({
	todos: todosReducer,
});

export const store = createStore(reducer, applyMiddleware(thunk));
