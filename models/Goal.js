import Model from '../lib/Model';
import Board from './Board';

export default class Goal extends Model {

}

Goal.needs = {
    boards: {
        type: Board,
        atLeast: 1
    }
};
