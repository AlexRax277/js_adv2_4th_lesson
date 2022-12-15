import './css/style.css';
import Widget from './app/isvalidcreditcardnumber.js';

document.addEventListener('DOMContentLoaded', () => {
  const widget = new Widget(document.body);
  widget.addingWidget();
  widget.onchecking();
});
