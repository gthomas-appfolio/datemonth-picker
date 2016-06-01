import { createStore } from 'redux';
import reducer from './datemonth_reducer.js';
import DateMonth from './DateMonth.js';
import Ractive from 'ractive';

// CJS-style export wrapper to avoid `DateMonth.default`:
module.exports = (element, name, date) => {

  const store = createStore(reducer);
  const app = new Ractive({
    el: element,
    components: {
      DateMonth
    },
    data: {
      name: name,
      store
    },
    template: `<DateMonth {{#name}}name="{{name}}"{{/name}} date={{store.getState()}} />`,
    oninit() {
      this.on({
        'DateMonth.MONTH': (event, month) => store.dispatch({ type: 'MONTH', month }),
        'DateMonth.YEAR': (event, year) => store.dispatch({ type: 'YEAR', year }),
        'DateMonth.NEXT': () => store.dispatch({ type: 'NEXT' }),
        'DateMonth.PREV': () => store.dispatch({ type: 'PREV' })
      });
    }
  });
  store.subscribe(() => app.update());

  // Initialize store if date passed
  if (date) {
    store.dispatch({ type: 'DATE', date: new Date(date) });
  }
}
