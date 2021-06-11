// Footer.stories.js

import m from 'mithril';

import { Panel } from './panel';

import { OpenEntities } from '../../models/openEntities.mjs'

export default {
  oninit: function(vnode) {
  	OpenEntities.closeAllEntities()
  	OpenEntities.openEntity('entity1', 'entity1Value')
  	OpenEntities.openEntity('entity2', 'entity2Value')
  	OpenEntities.openEntity('entity3', 'entity3Value')
  },
  view: function(vnode) {
  	return m(Panel, {
      theLink: {
        link: 'https://github.com/computePods/',
        class: 'not-navbar-item',
        text: 'ComputePods'
      }
  	})
  }
};
