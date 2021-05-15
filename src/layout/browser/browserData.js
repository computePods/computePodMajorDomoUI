export const BrowserData = () => {
  return {
    directories: {
      dirA: {
        directories: {
          dirA : {
          	files: {
              thingA : true,
      	      thingB : true,
          	}
          }
        },
        files: {
      	  thingA : true,
      	  thingB : true,
      	},
      },
      dirB: {
        directories: {
          dirA : {
          	files: {
              thingA : true,
      	      thingB : true,
          	},
          },
        },
        files: {
      	  thingA : true,
      	  thingB : true,
      	},
      },
    },
    files: {
      thingA : true,
      thingB : true,	
    },
  }
}