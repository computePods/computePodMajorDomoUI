/** @jsx m */

import m from 'mithril';

import { createLinkFromItem } from '../utils'

export function Header(origVNode) {
  
  let theLink = origVNode.attrs.theLink || {}
  let linkItem = createLinkFromItem(theLink)
  let theMenu = origVNode.attrs.theMenu || []
  let menuItems = theMenu.map(createLinkFromItem)
  
  return {
    view: (vnode) => m('header',{},
      m('div', 
        { 'class':"navbar", 'role':"navigation", 'aria-label':"main navigation" },
        m('div', { 'class':"navbar-brand" },
          linkItem,
        ),
        m('div', { 'class':"navbar-end navbar-item has-dropdown is-hoverable" },
          m('a', { 'class':"navbar-link "}, 'Actions' ),
          m('div', { 'class':"navbar-dropdown" },
            ...menuItems
          )
        )
      )
    ),
  }
}
