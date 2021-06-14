/*

  This component manages the browser based mock service worker for the
  mithril component viewer.

*/

// see: https://mswjs.io/docs/getting-started/integrate/browser

// see: https://mswjs.io/docs/api/setup-worker {start, stop}

// THIS REQUIRES the `mockServiceWorker.js` file to be located in the
// `distMCV` directory. see:
//    https://mswjs.io/docs/getting-started/integrate/browser#setup

import { setupWorker } from 'msw';
import { handlers } from './handlers';

export const Bsw = {
	theBswWorker: null,
	setup: function() {
    if (this.theBswWorker) return // we only setup ONCE
    this.theBswWorker = setupWorker(...handlers);
	},
	start: function() {
		if (this.theBswWorker) {
		  try {
			  this.theBswWorker.start()
			} catch (err) {
  	    console.log('Error starting the mock service worker:', err);
		  }
		}
	},
	stop: function() {
		if (this.theBswWorker && this.theBswWorker.hasOwnProperty('stop')) {
	    try {
  			this.theBswWorker.stop()
  	  } catch (err) {
  	    console.log('Error stopping the mock service worker:', err);
		  }
		}
	}
}
