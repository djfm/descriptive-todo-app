import React from 'react';
import {connect} from 'react-redux';

function appContainer ({uiRoot}) {
    if (uiRoot) {
        return <div>{'Got stuffz'}</div>;
    } else {
        return <div>{"Well, I don't know what you want me to do."}</div>;
    }
}

const select = state => {
    return { root: state.appReducer.getRoot() };
};

export default connect(select)(appContainer);
