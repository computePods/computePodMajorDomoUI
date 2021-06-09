import m from 'mithril';

import { SplitPanels } from './splitPanels';

export default {
  view: function(vnode) {
  	return m(SplitPanels, {
      maxNumSplits: 5,
      numOpenSplits: 2
  	})
  }
}
