import Api from './Api';
import addChatMan from './addChatMan';

export default class Modal {
  constructor() {
    this.popup = document.createElement('div');
    this.popup.className = 'login';
    this.popup.innerHTML = '<form action="" class="login__form">'
    + '<h2 class="login__form_title">Выберите ник</h2>'
    + '<input type="text" name="username" class="login__form_field" placeholder="your name">'
    + '<button class="login__form_btn" type="submit">Ok</button>'
    + '</form>';
    this.submitBtn = this.popup.querySelector('.login__form_btn');
    this.form = this.popup.querySelector('form');
  }

  addPopup() {
    document.body.insertAdjacentElement('beforeend', this.popup);
  }

  removePopup() {
    this.popup.remove();
  }

  addEvent() {
    this.submitBtn.addEventListener('click', (event) => {
      event.preventDefault();
      const userName = this.popup.querySelector('.login__form_field').value;
      if (userName === '') {
        alert('придумайте себе имя');
        return;
      }
      const apiForm = new Api(new FormData(this.form));
      apiForm.nameIsFree().then((resp) => {
        if (resp) {
          addChatMan(userName, true);
          this.removePopup();
          this.userName = userName;
        } else {
          alert('выберите другое имя');
          this.popup.querySelector('.login__form_field').value = '';
        }
      });
    });
  }
}
