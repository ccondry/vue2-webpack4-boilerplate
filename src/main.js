import Vue from 'vue'
// import Momentum from '../index.js'
// import Examples from '../examples.js'
import App from './app/index.vue'
import store from './app/store'
import router from './app/router'
// import { sync } from 'vuex-router-sync'
import VueRouter from 'vue-router'

// use 'buefy/src' when running from git,
// or use 'buefy' when running from npm
import Buefy from 'buefy/src'

// main and momentum style
import './styles.scss'
// custom and @media styles
import './style.css'
// load our modified Buefy styles
import './buefy.scss'
// add Buefy to Vue, and add momentum-ui icons to custom icon packs
Vue.use(Buefy, {
  customIconPacks: {
    'md-icon': {
      iconPrefix: 'icon icon-'
    }
  }
})

Vue.use(VueRouter)
// Vue.use(Momentum)

new Vue({
  // el: '#app',
  render: h => h(App),
  router,
  store
}).$mount('#app')
