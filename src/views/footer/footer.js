import m from 'mithril';

import { createLinkFromItem } from '../utils'

export const Footer = (origVNode) => {
  let theLink = origVNode.attrs.theLink || {}
  let linkItem = createLinkFromItem(theLink)
  return {
    view: () =>
      m(
        'footer',
        { class: 'footer' },
        m(
          'div',
          { class: 'content has-text-centered' },
          linkItem
        ),
      ),
  };
};
