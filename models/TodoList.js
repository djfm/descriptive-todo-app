import TodoItem from './TodoItem';

export default class TodoList {

}

TodoList.needs = {
    title: {
        count: 1,
        type: 'text'
    },
    todoItems: {
        count: { atLeast: 0 },
        type: TodoItem
    }
};
