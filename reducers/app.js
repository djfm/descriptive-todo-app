import deepFreeze from 'deep-freeze';

import App from '../lib/App';
import Goal from '../models/Goal';

const app = new App().setGoal(Goal);

export default function appReducer(initialState = app, action) {
    deepFreeze(initialState);



    return initialState;
}
