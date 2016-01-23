import React from 'react';
import {connect} from 'react-redux';

function appContainer ({pathname}) {
    return <div>{pathname}</div>;
}

const select = state => {
    return { pathname: state.routing.location.pathname };
};

export default connect(select)(appContainer);
