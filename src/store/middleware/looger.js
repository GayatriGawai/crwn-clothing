export const loggerMiddleware = (store) => (next) => (action) => {
    if (!action.type) {
        return next(action);
    }

    console.log('Type: ', action.type);
    console.log('Payload: ', action.payload);
    console.log('currentState: ', store.getState());

    next(action);
    console.log('next state: ', store.getState());
};
