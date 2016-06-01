import Ractive from 'ractive';
import template from './DateMonth.html';
import './DateMonth.css';
import './bootstrap.css';

export default Ractive.extend({
  isolated: true,
  data() {
    return {
      open: false
    }
  },
  template: template,
  onrender() {
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
