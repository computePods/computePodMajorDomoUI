import m from 'mithril'

import { createHiddenSVGForLaterUse, useIcon } from '../utils'
import { Header } from '../header/header'
import { SplitPanels } from '../splitPanels/splitPanels'
import { Footer } from '../footer/footer'

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
