import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import fecha from 'fecha';
import reducer from './datemonth_reducer.js';
import DateMonth from './DateMonth.js';

// CJS-style export wrapper to avoid `DateMonth.default`:
module.exports = (element, name = '', date) => {

  const store = createStore(reducer);

  const render = () => {
    ReactDOM.render(<DateMonth {...store.getState()} />, document.querySelector(element));
  }

  store.subscribe(render);
  render();
//        'DateMonth.MONTH': (event, month) => store.dispatch({ type: 'MONTH', month }),
//        'DateMonth.YEAR': (event, year) => store.dispatch({ type: 'YEAR', year }),
//        'DateMonth.NEXT': () => store.dispatch({ type: 'NEXT' }),
//        'DateMonth.PREV': () => store.dispatch({ type: 'PREV' })

  // Initialize store if date passed
  if (date) {
    let initial_date = fecha.parse(date, 'MMM YYYY');
    store.dispatch({ type: 'DATE', date: initial_date });
  }
}
