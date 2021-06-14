import m from 'mithril'

import { Header } from '../header/header.mjs'
import { SplitPanels } from '../splitPanels/splitPanels.mjs'
import { Footer } from '../footer/footer.mjs'

import { Panels } from '../../models/panels/panels.mjs'

// see: https://mithril.js.org/components.html#closure-component-state

export const MainPage = (initialVnode) => {
  return {
    view: (vnode) => {
      return m(
      	'div',
      	{class: 'main-page'},
      	m(Header, {
      	  class: 'main-page-header',
      	  theLink: { link: '/', text: 'ComputePods MajorDomo' },
      	  theMenu: [ { link: Panels.openAPanel, text: 'Add a panel'} ]
      	}),
      	m(SplitPanels),
      	m(Footer, {
      	  theLink: {
            link: 'https://github.com/computePods/',
            class: 'not-navbar-item',
            text: 'ComputePods'
          }
        })
      )
    }
  }
}
