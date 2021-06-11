/** @jsx m */

import m from 'mithril';

import { createLinkFromItem } from '../utils.mjs'

export const Header= {
  view: (vnode) => m('header',{},
    m('div',
      { 'class':"navbar", 'role':"navigation", 'aria-label':"main navigation" },
      m('div', { 'class':"navbar-brand" },
        createLinkFromItem(vnode.attrs.theLink || {}),
      ),
      m('div', { 'class':"navbar-end navbar-item has-dropdown is-hoverable" },
        m('a', { 'class':"navbar-link "}, 'Actions' ),
        m('div', { 'class':"navbar-dropdown" },
          ...theMenu.map(vnode.attrs.theMenu || [])
        )
      )
    )
  ),
}
