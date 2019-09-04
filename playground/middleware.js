import createSagaMiddleware from 'redux-saga';
import { compose, applyMiddleware } from 'redux';
import { saga } from './saga';

const sagaMiddleware = createSagaMiddleware();
const loggerMiddleware = () => (next) => (action) => {
    console.log(JSON.stringify(action));

    next(action);
};

export const middleware = compose(applyMiddleware(sagaMiddleware, loggerMiddleware));
export const runSaga = () => sagaMiddleware.run(saga);
