import Board from './Board';

export default class Goal {

}

Goal.needs = {
    boards: {
        type: Board,
        count: { atLeast: 1 }
    }
};
