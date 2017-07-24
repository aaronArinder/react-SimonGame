import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SimonGame from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<SimonGame />, document.getElementById('root'));
registerServiceWorker();
