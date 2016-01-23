import TodoList from './TodoList';

export default class Board {

}

Board.needs = {
    todoLists: {
        type: TodoList,
        count: { atLeast: 0 }
    }
};
