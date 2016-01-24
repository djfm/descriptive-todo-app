import Model from '../lib/Model';

export default class TodoItem extends Model {

}

TodoItem.needs = {
    title: {
        type: 'text'
    },
    completed: {
        type: 'bool',
        defaultValue: false
    }
};
