import {createStore} from 'redux';
import {Provider} from 'react-redux';
import React from 'react';
import {render as rtlRender} from '@testing-library/react';

import {initialState as initialReducerState, rootReducer} from './store/index';

jest.mock('react-router-dom');

function render(
    ui,
    {initialState = initialReducerState, store = createStore(rootReducer, initialState), ...renderOptions} = {}
) {
    function Wrapper({children}) {
        return (
            
                <Provider store={store}>{children}</Provider>
            
        );
    }
    return rtlRender(ui, {wrapper: Wrapper, ...renderOptions});
}

export * from '@testing-library/react';

export {render};
