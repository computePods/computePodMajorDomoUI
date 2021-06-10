export const BrowserData = () => {
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
