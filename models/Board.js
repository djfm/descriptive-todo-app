import Model from '../lib/Model';
import TodoList from './TodoList';

export default class Board extends Model {

}

Board.needs = {
    title: {
        type: 'text'
    },
    todoLists: {
        type: TodoList,
        atLeast: 0
    }
};
