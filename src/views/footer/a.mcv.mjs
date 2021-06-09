// Footer.stories.js

import m from 'mithril';

import { Footer } from './footer';

export default {
  view: function(vnode) {
    return m(Footer, {
      theLink: {
        link: 'https://github.com/computePods/',
        class: 'not-navbar-item',
        text: 'ComputePods'
      }
    })
  }
};
