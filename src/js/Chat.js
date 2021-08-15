import Api from './Api';
import addChatMan from './addChatMan';

export default class Chat {
  static getNames() {
    Api.getNamesApi().then((resp) => {
      resp.forEach((el) => {
        addChatMan(el, false);
      });
    });
  }

  static printMessage(authorName, time, MessageText, isMyMessage, id) {
    const message = document.createElement('li');
    message.className = 'chat__message';
    message.dataset.messageId = id;
    message.innerHTML = `<span class="chat__message_author">${authorName}</span>`
    + `<span class="chat__message_time">${time}</span>`
    + `<span class="chat__message_text">${MessageText}</span>`;
    if (isMyMessage) {
      message.classList.add('your_message');
    }
    document.querySelector('.chat__messages').insertAdjacentElement('beforeend', message);
  }

  constructor() {
    this.form = document.querySelector('.chat__form');
    this.messageBox = document.querySelector('.chat__messages');
    this.field = document.querySelector('.chat__field');
    this.messages = [];
    this.sendMessage = this.sendMessage.bind(this);
    this.namesBox = document.querySelector('.chat__peoples');
  }

  eventSend() {
    this.form.querySelector('.chat__btn').addEventListener('click', (e) => {
      const myName = document.querySelector('.my_name').textContent;
      e.preventDefault();
      this.sendMessage(myName);
      this.field.value = '';
    });
  }

  sendMessage(author) {
    const api = new Api(new FormData(this.form), author);
    api.messageSend();
  }
}
