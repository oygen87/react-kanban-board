import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { MyProvider } from './store/MyContext.js';

ReactDOM.render(<MyProvider><App /></MyProvider>, document.getElementById('root'));
serviceWorker.unregister();
