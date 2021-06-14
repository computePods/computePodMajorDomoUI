import m from 'mithril';

import { Panel } from '../panel/panel.mjs'
import { Panels } from '../../models/panels/panels.mjs'

export const SplitPanels = {
  oncreate: function(vnode) {
    Panels.reCreateSplitter()
  },
  view: function(vnode) {
    var thePanels = []
    for (var aPanel of Panels.thePanels) {
  		thePanels.push(
  		  m(Panel,
  		    {
  		    	panelID: aPanel.id,
    		  	panelNum: aPanel.num,
    		  	panelHidden: aPanel.hidden
    		  }
    		)
  		)
    }
    return m(
      'div',
      { class: 'split split-panels' },
      thePanels
    )
  }
};
