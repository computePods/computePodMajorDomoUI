import m from 'mithril'

import { createHiddenSVGForLaterUse, useIcon } from '../utils.mjs'
import { Header } from '../header/header.mjs'
import { SplitPanels } from '../splitPanels/splitPanels.mjs'
import { Footer } from '../footer/footer.mjs'

// see: https://mithril.js.org/components.html#closure-component-state

export const MainPage = (initialVnode) => {
  return {
    view: (vnode) => { 
      return m(
      	'div',
      	{},
      	createHiddenSVGForLaterUse(),
      	m(Header, {
      	  theLink: { link: '/', text: 'ComputePods MajorDomo' },
      	  theMenu: [ { link: '/', text: 'Add a panel'} ]
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
