import m from 'mithril';

import { Browser     } from './browser';
import { BrowserData } from './browserData';
import { Artefacts   } from '../../models/artefacts.mjs';

function mergeBrowserData(aPath, someBrowserData) {
  Artefacts.addNodeInfo(aPath, someBrowserData)
  if (someBrowserData.hasOwnProperty('branches')) {
  	for (let aBranch in someBrowserData['branches']) {
  		mergeBrowserData(aPath+'/'+aBranch, someBrowserData['branches'][aBranch])
  	}
  }
}

export default {
  oninit: function(vnode) {
  	Artefacts.clearAllArtefacts()
  	mergeBrowserData('', BrowserData())
  	console.dir(Artefacts.theArtefacts)
  },
	view: function(vnode) {
		return m(Browser)
	}
}
