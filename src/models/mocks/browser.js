// based on: https://github.com/josephspurrier/mithril-template

// see: https://mswjs.io/docs/getting-started/integrate/browser

import { setupWorker } from '@msw';
import { handlers } from '@cpmd/models/mocks/handler';
import { Global } from '@cpmd/helpers/global';

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...handlers);

export const setup = (): void => {
  // Enable mock server if set.
  if (Global.mockServer) {
    // Start mocking when the application starts.
    worker.start().catch((err) => {
      console.log('Error starting the service worker:', err);
    });
  }
};
