import { createStore } from 'redux'
import fecha from 'fecha';
import reducer from './datemonth_reducer.js';
import './DateMonth.css';
import './bootstrap.css';

<DateMonth>
  <div class="date_month">
    <header>
      <div class="input-group">
        <input name={ opts.name } type="text" class="form-control"
               value={ time.month_year }
               twoway="false"
               onfocus={ OPEN }>
        <span class="input-group-addon" onclick={ TOGGLE }>
          <i class="icon icon-calendar"></i>
        </span>
      </div>
    </header>

      <div class="picker" if={ open }>
        <div class="row">
          <div class="month col-xs-6">
            <ul>
                <li each={ label, m in time.visible_months } class={ selected: time.month == m } onclick={ () => MONTH(m) }>
                  {label}
                </li>
            </ul>
          </div>

          <div class="year col-xs-6">
            <header class="btn-group btn-group-xs btn-group-justified">
              <a onclick={ PREV } class="btn btn-default">
                <i class="icon icon-caret-left"></i>
              </a>
              <a onclick={ NEXT } disabled={ !time.can_advance_year } class="btn btn-default">
                <i class="icon icon-caret-right"></i>
              </a>
            </header>
            <ul>
              <li each={ y in time.visible_years } class={ selected: time.year == y } onclick={ () => YEAR(y) }>
                {y}
              </li>
            </ul>
          </div>
        </div>
        <footer class="text-center">
          <a class="btn btn-sm btn-default" onclick={ CLOSE }>OK</a>
          <a class="btn btn-sm btn-default" onclick={ CANCEL }>Cancel</a>
        </footer>
      </div>
  </div>

  <script>
    this.open = false;
    const store = createStore(reducer);

    this.OPEN = () => {
      this.open = true;
      this.undo = this.time.date;
    }
    this.CANCEL = () => {
      this.open = false;
      store.dispatch({ type: 'DATE', date: this.undo });
    }
    this.CLOSE = () => this.open = false;
    this.TOGGLE = () => {
      this.open = !this.open;
      this.undo = this.time.date;
    }

    this.MONTH = (month) => {
      store.dispatch({ type: 'MONTH', month });
    }
    this.YEAR = (year) => {
      store.dispatch({ type: 'YEAR', year });
    }
    this.NEXT = () => {
      store.dispatch({ type: 'NEXT' });
    }
    this.PREV = () => {
      store.dispatch({ type: 'PREV' });
    }

    const render = () => {
      this.time = store.getState();
      this.update();
    }
    store.subscribe(render);

    if (this.opts.value) {
      let initial_date = fecha.parse(this.opts.value, 'MMM YYYY');
      store.dispatch({ type: 'DATE', date: initial_date });
    }
  </script>
</DateMonth>
