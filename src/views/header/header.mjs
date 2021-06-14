/** @jsx m */

import m from 'mithril';

import { createLinkFromItem } from '../utils.mjs'

export const Header= {
  view: function(vnode) {
    var theMenu = vnode.attrs.theMenu || []
    if (theMenu.length < 1) {
      var navbarEnd = m('div')
    } else if (theMenu.length < 2) {
      var navbarEnd =
        m('div', { 'class':"navbar-end navbar-item" },
          createLinkFromItem(theMenu[0])
        )
    } else {
      var navbarEnd =
        m('div', { 'class':"navbar-end navbar-item has-dropdown is-hoverable" },
          m('a', { 'class':"navbar-link "}, 'Actions' ),
          m('div', { 'class':"navbar-dropdown is-right" },
            ...(theMenu).map(createLinkFromItem)
          )
        )
    }
    return m('header',
      { class: (vnode.attrs.class || 'header')},
      m('div',
        { 'class':"navbar", 'role':"navigation", 'aria-label':"main navigation" },
        m('div', { 'class':"navbar-brand" },
          createLinkFromItem(vnode.attrs.theLink || {}),
        ),
        navbarEnd
      )
    )
  }
}
