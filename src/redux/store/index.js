import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// *** Reducer
import reducers from '../reducers';

const composeEnhancers = typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ !== "undefined"
? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(applyMiddleware(thunk))
: applyMiddleware(thunk);

const store = createStore(reducers, {}, composeEnhancers);
export default store;