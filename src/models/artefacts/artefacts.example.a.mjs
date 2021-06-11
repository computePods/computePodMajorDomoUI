import { Artefacts } from './artefacts.mjs'

export function InstallArtefactsExample () {
  Artefacts.clearAllArtefacts()
  mergeBrowserData('', BrowserData())
}

function mergeBrowserData(aPath, someBrowserData) {
  Artefacts.addNodeInfo(aPath, someBrowserData)
  if (someBrowserData.hasOwnProperty('branches')) {
  	for (let aBranch in someBrowserData['branches']) {
  		mergeBrowserData(aPath+'/'+aBranch, someBrowserData['branches'][aBranch])
  	}
  }
}

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

