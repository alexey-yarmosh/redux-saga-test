import { combineReducers, createStore, applyMiddleware } from 'redux';
import $ from 'jquery';
import createSagaMiddleware from 'redux-saga';
import watchDelayedPlus from './sagas';

/*ACTIONS*/

const plus = {
  type: 'PLUS'
}

const minus = {
  type: 'MINUS'
}

const delayedPlus = {
  type: 'DELAYED_PLUS'
}

/*REDUCERS*/

const number = (state = 0, action) => {
  switch (action.type) {
    case 'PLUS':
      return state + 1;
    case 'MINUS':
      return state - 1;
    default:
      return state;
  }
}

/*MIDDLEWARES*/

const logger = function({getState, dispatch}) {
  return function(next) {
    return function(action) {
      console.log('dipatching:', action);
      let returnValue = next(action);
      console.log('state after dispatch', getState());
      return returnValue
    }
  }
}

const sagaMiddleware = createSagaMiddleware();

/*START REDUX*/

const counterApp = combineReducers({ number });
const store = createStore(counterApp, applyMiddleware(logger, sagaMiddleware));
sagaMiddleware.run(watchDelayedPlus);

/*KEY LISTENERS*/

$('#plus').on('click', () => { store.dispatch(plus) });
$('#minus').on('click', () => { store.dispatch(minus) });
$('#delayed-plus').on('click', () => { store.dispatch(delayedPlus) });
