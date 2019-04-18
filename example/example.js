import Jue from '../src/index.js';

const app = new Jue({
  el: '#app',
  data: {
    userInfo: {
      name: 'jiaying',
      address: {
        city: 'guangzhou',
        area: 'haizhu'
      },
      howToDo: ['i', 'like', 'peiyi']
    }
  }
});

window.app = app;
app.$amount();