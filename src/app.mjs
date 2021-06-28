import m from 'mithril';

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
