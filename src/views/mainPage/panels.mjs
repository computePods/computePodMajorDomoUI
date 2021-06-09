import m from 'mithril'

import { Panel } from '../panel/panel.mjs'

/*
  The Panels component manages the "Panels" used by the SplitPanels View.

  To keep things simple, we create a collection of panels and then hide
  those which are not being used. Given current browser sizes, a
  collection of 4-5 panels should be more than sufficient.

  We "hide" a panel in two ways:

   1. Hidden panels are not listed in the `split()` method.

   2. Hidden panels are given the hidden attribute.

*/

export const Panels = {
  thePanels : [],
  createPanels: function(maxNumSplits, numOpenSplit) {
    this.thePanels = []
    for (let i = 0; i < maxNumSplits; i++) {
    	this.thePanels[i] = true
    }
  },
  openAPanel: function() {
  }
}
