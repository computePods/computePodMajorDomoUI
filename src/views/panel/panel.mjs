import m from 'mithril';

import { Header } from '../header/header.mjs'
import { createLinkFromItem } from '../utils.mjs'

import { OpenEntities } from '../../models/openEntities.mjs'

export const Panel = (origVNode) => {
  let theLink = origVNode.attrs.theLink || {}
  let linkItem = createLinkFromItem(theLink)
  let theMenu = OpenEntities.compileMenu([], function(aName) { console.log(aName)})
  return {
    view: () =>
      m(
        'div',
        { class: 'panel' },
        m(Header, {
          theMenu: theMenu
        }),
        m(
          'div',
          { class: 'content' },
          linkItem
        ),
      ),
  };
};
