import React from 'react';
import { render } from 'react-dom';
import './index.css';
import './media_screens.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import { App } from './App';

render((

<BrowserRouter>
    <Provider store={store}>
            <App />
    </Provider>
</BrowserRouter>

), document.getElementById('index'));

// ReactDOM.render(<ChattBox />, document.getElementById('chattBox'));

serviceWorker.unregister();
