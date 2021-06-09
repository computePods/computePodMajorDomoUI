import m from 'mithril';

import { Header } from '../header/header'
import { createLinkFromItem } from '../utils'

export const Panel = (origVNode) => {
  let theLink = origVNode.attrs.theLink || {}
  let linkItem = createLinkFromItem(theLink)
  return {
    view: () =>
      m(
        'div',
        { class: 'panel' },
        m(Header, {
        	
        }),
        m(
          'div',
          { class: 'content' },
          linkItem
        ),
      ),
  };
};
