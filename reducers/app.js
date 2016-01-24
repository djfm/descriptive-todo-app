import deepFreeze from 'deep-freeze';

import App from '../lib/App';
import Goal from '../models/Goal';

const initialState = new App().setGoal(Goal);

console.log(new Goal().getSlots());

export function appReducer(app = initialState, action) {
    deepFreeze(app);

    return app.figureOutNextGoal();
}
