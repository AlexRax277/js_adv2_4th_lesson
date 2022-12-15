export default class Widget {
  constructor(domEl) {
    this.domEl = domEl;
    this.onchecking = this.onchecking.bind(this);
  }

  static structure() {
    const container = document.createElement('div');
    container.classList = 'container';

    const header = document.createElement('h2');
    header.textContent = 'Проверьте свою карту';
    container.appendChild(header);

    const cardList = document.createElement('ul');
    cardList.classList = 'cardList';

    const sourceCards = ['am-exp', 'din-cl', 'disc', 'jcb', 'master', 'mir', 'visa'];
    sourceCards.forEach((card) => {
      const currentCard = document.createElement('li');
      currentCard.classList = `card ${card}`;
      cardList.appendChild(currentCard);
    });
    container.appendChild(cardList);

    const form = document.createElement('form');
    form.classList = 'form-group';

    const input = document.createElement('input');
    input.classList = 'form-control';
    input.type = 'text';
    input.placeholder = 'Номер карты';
    form.appendChild(input);

    const btn = document.createElement('a');
    btn.classList = 'btn';
    btn.textContent = 'Нажмите для проверки';
    form.appendChild(btn);

    const myMessage = document.createElement('div');
    myMessage.classList = 'msg';
    myMessage.textContent = 'some text';
    form.appendChild(myMessage);

    container.appendChild(form);

    return container;
  }

  static validation(cardNo) {
    const fixcardNo = cardNo.replace(/ /g, '');
    const nDigits = fixcardNo.length;
    let nSum = 0;
    let isSecond = false;
    for (let i = nDigits - 1; i >= 0; i--) {
      let d = fixcardNo[i].charCodeAt() - '0'.charCodeAt();
      if (isSecond === true) d *= 2;
      nSum += parseInt(d / 10, 10);
      nSum += d % 10;
      isSecond = !isSecond;
    }
    return (nSum % 10 === 0);
  }

  addingWidget() {
    this.domEl.appendChild(Widget.structure());
  }

  addingFrame(data) {
    const allCards = document.querySelectorAll('.card');
    allCards.forEach((card) => { card.classList.remove('frame'); });
    let currentCard = null;
    if (/^4/.test(data)) {
      currentCard = this.domEl.querySelector('.visa');
    } else if (/^55/.test(data)) {
      currentCard = this.domEl.querySelector('.master');
    } else if (/^35/.test(data)) {
      currentCard = this.domEl.querySelector('.jcb');
    } else if (/^6011/.test(data)) {
      currentCard = this.domEl.querySelector('.disc');
    } else if (/^305/.test(data)) {
      currentCard = this.domEl.querySelector('.din-cl');
    } else if (/^37/.test(data)) {
      currentCard = this.domEl.querySelector('.am-exp');
    } else if (/^2/.test(data)) {
      currentCard = this.domEl.querySelector('.mir');
    }
    currentCard.classList.toggle('frame');
  }

  onchecking() {
    const button = this.domEl.querySelector('.btn');
    const nCard = this.domEl.querySelector('.form-control');
    const msg = this.domEl.querySelector('.msg');
    button.addEventListener('click', () => {
      if (Widget.validation(nCard.value) && nCard.value !== '' && /[0-9]+/.test(nCard.value)) {
        msg.textContent = 'карта действительна';
        msg.classList.remove('invalid');
        msg.classList.toggle('valid');
        this.addingFrame(nCard.value);
      } else {
        msg.textContent = 'карта недействительна, либо это вообще не карта';
        msg.classList.remove('valid');
        msg.classList.toggle('invalid');
      }
    });
  }
}
