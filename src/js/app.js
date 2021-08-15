import Modal from './Modal';
import Chat from './Chat';
import Api from './Api';
import addChatMan from './addChatMan';

const modal = new Modal();

(function () {
  modal.addEvent();
  modal.addPopup();
}());
const chat = new Chat();
chat.eventSend();
Chat.getNames();

function deleteNameApi() {
  const myName = document.querySelector('.my_name').textContent;
  const api = new Api({}, myName);
  api.deleteName(myName);
}

const ws = new WebSocket('wss://t1hw8.herokuapp.com/ws');

ws.addEventListener('open', () => {
  // console.log('connected');
  ws.send('hello');
});

ws.addEventListener('message', (evt) => {
  // получаем пользователей и сообщения
  const resp = JSON.parse(evt.data);
  const { messages: newMessages, names } = resp;
  const oldMessages = [...document.querySelectorAll('.chat__message')];
  const oldNames = [...document.querySelectorAll('.chat__man_name')];

  // ищем новые сообщения
  newMessages.forEach((elt) => {
    const {
      author, text, time, messageId,
    } = elt;
    const messageInPage = oldMessages.some((el) => +el.dataset.messageId === messageId);
    if (!messageInPage) {
      const textTime = time.split(' ')[4];
      try {
        const isMyMessage = document.querySelector('.my_name').textContent === author;
        Chat.printMessage(author, textTime, text, isMyMessage, messageId);
      } catch {

        // console.log('my name is empty');
      }
    }
  });

  // ищем новых пользователей
  names.forEach((elt) => {
    const nameInPage = oldNames.some((el) => el.textContent === elt);
    if (!nameInPage) {
      addChatMan(elt, false);
    }
  });
  oldNames.forEach((elt) => {
    const actualNameInPage = names.some((el) => elt.textContent === el);
    if (!actualNameInPage) {
      elt.remove();
    }
  });
});

ws.addEventListener('close', () => {
  try {
    deleteNameApi();
  } catch {
    return;
    // console.log('my name is not delete');
  }
  alert('соединение потеряно');
});

ws.addEventListener('error', () => {
  console.log('error');
});

setInterval(() => {
  try {
    ws.send('hello');
  } catch (e) {
    console.log(e);
  }
}, 1000);

window.addEventListener('beforeunload', (e) => {
  e.preventDefault();
  e.returnValue = 'Вы точно хотите выйти?';
  deleteNameApi();
});
