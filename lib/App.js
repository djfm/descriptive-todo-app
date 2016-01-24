import {Map} from 'immutable';

const defaultData = () => new Map({
    goal: undefined,
});

export default class App {
    constructor (data = defaultData()) {
        this.data = data;
    }

    setGoal (model) {
        const data = this.data
            .set('goal', model)
        ;
        return new App(data);
    }

    getRoot () {
        return this.data.get('root');
    }

    figureOutNextGoal () {
        const appGoal = this.data.get('goal');

        console.log(appGoal.needs);

        return this;
    }
}
