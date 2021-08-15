export default class Api {
  static getNamesApi() {
    return fetch('https://t1hw8.herokuapp.com/getnames', {
      method: 'GET',
    }).then((response) => response.json());
  }

  constructor(formData = {}, author = '') {
    this.form = formData;
    this.author = author;
  }

  nameIsFree() {
    return fetch('https://t1hw8.herokuapp.com/username', {
      method: 'POST',
      body: this.form,
    }).then((response) => response.json()).then((response) => response.nameIsFree);
  }

  messageSend() {
    this.form.append('username', this.author);
    this.form.append('time', new Date());
    return fetch('https://t1hw8.herokuapp.com/setmessage', {
      method: 'POST',
      body: this.form,
    }).then((response) => response.json());
  }

  deleteName() {
    return fetch('https://t1hw8.herokuapp.com/deletename', {
      method: 'POST',
      body: JSON.stringify({ name: this.author }),
    }).then((response) => response.json());
  }
}
