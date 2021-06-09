export const BrowserData = () => {
  return {
    name: 'browser',
    directories: {
      dirA: {
        name: 'dirA',
        directories: {
          dirA : {
            name: 'dirA',
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
        name: 'dirB',
        directories: {
          dirA : {
            name: 'dirB',
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
