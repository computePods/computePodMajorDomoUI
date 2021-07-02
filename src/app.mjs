import m from 'mithril';

import log from 'loglevel'

// we use the LogLevel tool to show/hide log messages at various levels.
//
// see: https://github.com/pimterry/loglevel

log.setDefaultLevel("error")

// import pages

import { MainPage } from './views/mainPage/mainPage.mjs'
import './global.scss'

// add mithril routes as needed....

var root = document.body
m.route(root, "/home", {
	'/home' : {
		view: function() {
			return m.(MainPage)
		}
	}
})
