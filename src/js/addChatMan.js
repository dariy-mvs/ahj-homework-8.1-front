export default function addChatMan(name, isMyName) {
  const userName = name;
  let nameLetters = userName.split(' ');
  nameLetters = nameLetters.map((el) => el.slice(0, 1)).join('');
  const userMini = document.createElement('div');
  userMini.className = 'chat__man';
  userMini.innerHTML = `<div class="chat__man_mini">${nameLetters}</div>
    <div class="chat__man_name">${userName}</div>`;
  if (isMyName) {
    userMini.querySelector('.chat__man_name').classList.add('my_name');
  }
  document.querySelector('.chat__peoples').insertAdjacentElement('beforeend', userMini);
}
