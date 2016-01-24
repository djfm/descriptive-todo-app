import Model from '../lib/Model';
import TodoItem from './TodoItem';

export default class TodoList extends Model {

}

TodoList.needs = {
    title: {
        type: 'text'
    },
    todoItems: {
        type: TodoItem,
        atLeast: 0
    }
};
