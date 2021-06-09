// Footer.stories.js

import m from 'mithril';

import { Panel } from './panel';

export default {
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
