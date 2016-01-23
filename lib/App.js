import {Map} from 'immutable';

export default class App {
    constructor (data = new Map()) {
        this.data = data;
    }

    setGoal (model) {
        return new App(this.data.set('goal', model));
    }
}
