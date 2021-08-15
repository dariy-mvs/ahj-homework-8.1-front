export default class Api {
  static getNamesApi() {
    return fetch('http://localhost:7070/getnames', {
      method: 'GET',
    }).then((response) => response.json());
  }

  constructor(formData = {}, author = '') {
    this.form = formData;
    this.author = author;
  }

  nameIsFree() {
    return fetch('http://localhost:7070/username', {
      method: 'POST',
      body: this.form,
    }).then((response) => response.json()).then((response) => response.nameIsFree);
  }

  messageSend() {
    this.form.append('username', this.author);
    this.form.append('time', new Date());
    return fetch('http://localhost:7070/setmessage', {
      method: 'POST',
      body: this.form,
    }).then((response) => response.json());
  }

  deleteName() {
    return fetch('http://localhost:7070/deletename', {
      method: 'POST',
      body: JSON.stringify({ name: this.author }),
    }).then((response) => response.json());
  }
}
