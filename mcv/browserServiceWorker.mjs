/*

  This component manages the browser based mock service worker for the
  mithril component viewer.

*/

// see: https://mswjs.io/docs/getting-started/integrate/browser
// see: https://mswjs.io/docs/getting-started/mocks/rest-api
// see: https://mswjs.io/docs/api/setup-worker {start, stop}

// THIS REQUIRES the `mockServiceWorker.js` file to be located in the
// `distMCV` directory. see:
//    https://mswjs.io/docs/getting-started/integrate/browser#setup

import { rest, setupWorker } from 'msw';

import { All_examples, All_handlers } from '../src/interfaces/AllMsw.mjs'

import { OpenEntities } from '../src/models/openEntities/openEntities.mjs'

const handlers = All_handlers()

export function InstallBswExamples() {
	for (var anExample in All_examples) {
		OpenEntities.openEntity(anExample, All_examples[anExample]())
	}
}

export const Bsw = {
  theBswWorker: null,
  setup: function() {
    if (this.theBswWorker) return // we only setup ONCE
    this.theBswWorker = setupWorker(...handlers);
  },
  listHandlers: function() { this.theBswWorker.printHandlers()},
  start: function() {
    if (this.theBswWorker) {
      try {
        this.theBswWorker.resetHandlers()
        this.theBswWorker.start({
          onUnhandledRequest(req) {
            console.log(
              'Found an unhandled %s request to %s',
              req.method,
              req.url.href,
            )
          },
        })
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
