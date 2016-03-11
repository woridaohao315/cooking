var Vue = require('vue');
var App = require('root/app');

new Vue({ // eslint-disable-line
  el: 'body',
  components: { App: App }
});
