import m from 'mithril'

import log from 'loglevel'

import { createHiddenSVGForLaterUse } from '../src/views/utils.mjs'
import { NavMenuList, GetMCVRoutes  } from './mcvPages.mjs'

// we use the LogLevel tool to show/hide log messages at various levels.
//
// see: https://github.com/pimterry/loglevel

//log.setDefaultLevel("trace")
//log.setDefaultLevel("debug")
//log.setDefaultLevel("info")
log.setDefaultLevel("warn")
//log.setDefaultLevel("error")

var NavMenu = {
  view: function(vnode) {
    return m("nav.nav-menu", NavMenuList)
  }
}

var Layout = {
  view: function(vnode) {
    return m("main.layout", [
      createHiddenSVGForLaterUse(),
      m(NavMenu),
      m("hr"),
      m("component", vnode.children),
      m("hr"),
      m(NavMenu),
    ])
  }
}

var root = document.body
var mcvRoutes = GetMCVRoutes(Layout)

m.route(root, '/home', mcvRoutes )
