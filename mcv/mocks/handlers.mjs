// based on: https://github.com/josephspurrier/mithril-template

// see: https://mswjs.io/docs/getting-started/mocks/rest-api
// see: https://mswjs.io/docs/api/setup-worker

import { rest } from 'msw';
import { AsyncResponseResolverReturnType, MockedResponse } from 'msw';

// VERSION 1.0.0

const apiServer = `https://localhost:8080`

export const handlers = [
  // Get something
  rest.get(apiServer + '/api/v1', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: 'something'
      })
    )
  })
]
