import Vue from 'vue'
import App from './App.vue'


import 'bootstrap'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

window.$ = window.jQuery = require('jquery');

import VRuntimeTemplate from "v-runtime-template";

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
