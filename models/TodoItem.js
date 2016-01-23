export default class TodoItem {

}

TodoItem.needs = {
    title: {
        count: 1,
        type: 'text'
    },
    completed: {
        count: 1,
        type: 'bool',
        defaultValue: false
    }
};
