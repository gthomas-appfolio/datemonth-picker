import React from 'react';
import { render } from 'react-dom';
import hyperx from 'hyperx';
let hx = hyperx(React.createElement);

import './DateMonth.css';
import './bootstrap.css';

export default React.createClass({
  getInitialState() {
    return {
      open: false,
      value: this.props.value || ''
    };
  },
  handleChange(event) {
    this.setState({ value: event.target.value });
  },
  open() {
    this.setState({ open: true });
  },
  close() {
    this.setState({ open: false });
  },
  MONTH(m) {
    console.log('MONTH', m);
  },
  YEAR(y) {
    console.log('YEAR', y);
  },
  NEXT() {
    console.log('NEXT');
  },
  PREV() {
    console.log('PREV');
  },
  render() {
     return hx`
<div class="date_month">
  <header>
    <div class="input-group">
      <input name=${this.props.name} type="text" class="form-control"
             value=${this.props.month_year}
             onFocus=${this.open} />
      <span class="input-group-addon" onClick=${this.open}>
        <i class="icon icon-calendar"></i>
      </span>
    </div>
  </header>

  <div class="picker" style=${ {display: this.state.open ? 'block':'none'} }">
    <div class="row">

      <div class="month col-xs-6">
        <ul>
          ${this.props.visible_months.map((label,i) => {
              return hx`<li class=${this.props.month == i? 'selected':''} onClick=${() => this.MONTH(i)}">${label}</li>`
            })}
        </ul>
      </div>

      <div class="year col-xs-6">
        <header class="btn-group btn-group-xs btn-group-justified">
          <a onClick=${this.PREV} class="btn btn-default">
            <i class="icon icon-caret-left"></i>
          </a>
          <a onClick=${this.NEXT} disabled=${!this.can_advance_year} class="btn btn-default">
            <i class="icon icon-caret-right"></i>
          </a>
        </header>
        <ul>
          ${this.props.visible_years.map((year) => {
            return hx`<li class=${this.props.year == year ? 'selected':''} onClick=${() => this.YEAR(year)}>${year}</li>`
          })}
        </ul>
      </div>
    </div>
    <footer class="text-center">
      <a class="btn btn-sm btn-default" onClick=${this.close}>OK</a>
      <a class="btn btn-sm btn-default" onClick=${this.close}>Cancel</a>
    </footer>
  </div>

</div>
`
  }
});

/*
     return hx`
<div class="date_month">
  <header>
    <div class="input-group">
      <!-- TODO two way error due to input: -->
      <input name=${name} type="text" class="form-control"
             value=${this.month_year}
             onFocus=${this.open}>
      <span class="input-group-addon" onClick=${this.open}>
        <i class="icon icon-calendar"></i>
      </span>
    </div>
  </header>

  <div class="picker" style="display: ${this.state.open ? 'block':'none'}">
    <div class="row">
      <div class="month col-xs-6">
        <ul>
          ${this.props.visible_months.map((label,i) => {
              return hx`<li class=${this.month == i? 'selected':''} onClick=${this.MONTH(i)}">${label}</li>`
            })}
        </ul>
      </div>

      <div class="year col-xs-6">
        <header class="btn-group btn-group-xs btn-group-justified">
          <a onClick=${this.PREV} class="btn btn-default">
            <i class="icon icon-caret-left"></i>
          </a>
          <a onClick=${this.NEXT} disabled=${!this.can_advance_year} class="btn btn-default">
            <i class="icon icon-caret-right"></i>
          </a>
        </header>
        <ul>
          ${this.props.visible_years.map((label,i) => {
              return hx`<li class=${this.year == i ? 'selected':''} onClick=${this.YEAR(i)}>${label}</li>`
            })}
        </ul>
      </div>
    </div>
    <footer class="text-center">
      <a class="btn btn-sm btn-default" onClick=${this.close}>OK</a>
      <!-- TODO revert on cancel: -->
      <a class="btn btn-sm btn-default" onClick=${this.close}>Cancel</a>
    </footer>
  </div>

</div>
`
*/
