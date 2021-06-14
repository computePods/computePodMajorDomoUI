import m from 'mithril';

import { createLinkFromItem } from '../utils'

export const Footer = {
  view: function(vnode) {
    return m(
      'footer',
      { class: 'footer' },
      m(
        'div',
        { class: 'content has-text-centered' },
        createLinkFromItem(vnode.attrs.theLink || {})
      )
    )
  }
};
