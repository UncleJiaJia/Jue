import Jue from '../src/index.js'

const app = new Jue({
  el: '#app',
  data: {
    userInfo: {
      name: 'jiaying',
      address: {
        city: 'guangzhou',
        area: 'haizhu'
      },
      character: 'programmer',
      howToDo: ['i', 'like', 'peiyi']
    }
  },
  computed: {
    addname: function() {
      return this.userInfo.name + this.userInfo.address.city;
    }
  },
})

window.app = app
setTimeout(() => {
  app.$data.userInfo.address.city = '广州';
  app.$data.userInfo.address.city = '深圳';
}, 3000)
// app.$amount()
