import React from 'react';
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
    this.setState({
      value: event.target.value
    });
  },
  close() {
    this.setState({ open: false });
  },
  open() {
    this.setState({ open: true });
  },
  render() {
    return (
      <div className="date_month">
        <header>
          <div className="input-group">
            <input name={this.props.name} type="text" className="form-control"
                   value={this.state.value}
                   onChange={this.handleChange}
                   onFocus={this.open} />
            <span className="input-group-addon" onClick={this.open}>
              <i className="icon icon-calendar"></i>
            </span>
          </div>
        </header>

        { this.state.open ? (
          <div className="picker">
            <div className="row">
              <div className="month col-xs-6">
                <ul>
                  {visible_months.map(m => {
                    <li className={month == m ? 'selected':''} onClick="MONTH:{m}">
                      {m}
                    </li>
                  })}
                </ul>
              </div>

              <div className="year col-xs-6">
                <header className="btn-group btn-group-xs btn-group-justified">
                  <a on-click="PREV" className="btn btn-default">
                    <i className="icon icon-caret-left"></i>
                  </a>
                  <a on-click="NEXT" disabled={!can_advance_year} className="btn btn-default">
                    <i className="icon icon-caret-right"></i>
                  </a>
                </header>
                <ul>
                  {visible_years.map(y =>
                    <li className={year == y ? 'selected':''} onClick="YEAR:{this}">
                      {this}
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <footer className="text-center">
              <a className="btn btn-sm btn-default" onClick={this.close}>OK</a>
              <a className="btn btn-sm btn-default" onClick={this.close}>Cancel</a>
            </footer>
          </div>
        ) : null}

      </div>);
  },
  ummmm() {
    this.listener = event => {
      let container = this.find('.date_month');
      if (container && !event.path.includes(container)) {
        this.set('open', false);
      }
      return true;
    };
    document.addEventListener('click', this.listener);
  },
  onunrender() {
    document.removeEventListener('click', this.listener);
  }
});

