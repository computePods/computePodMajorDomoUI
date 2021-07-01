import m from 'mithril'

import { createHiddenSVGForLaterUse } from '../src/views/utils.mjs'
import { NavMenuList, GetMCVRoutes  } from './mcvPages.mjs'

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
