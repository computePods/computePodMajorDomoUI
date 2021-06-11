import m from 'mithril';

import { Browser     } from './browser';
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
  },
	view: function(vnode) {
		return m(Browser)
	}
}

///////////////////////////////////////////////////////////////////////////
// this example's Browser Data:

const BrowserData = () => {
  return {
    branches: {
      dirA: {
        branches: {
          dirA : {
            branches: {
              thingA : true,
    	        thingB : true,
            }
          },
     	    thingA : true,
     	    thingB : true,
        },
      },
      dirB: {
        branches: {
          dirA : {
            branches: {
              dirB: {
                branches: {
                  thingA : true,
    	            thingB : true,
                }
              },
        	    thingA : true,
        	    thingB : true,
            }
          }
        }
      },
      thingA : true,
      thingB : true,
    },
  }
}

