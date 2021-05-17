// based on: https://github.com/josephspurrier/mithril-template

// see: https://mswjs.io/docs/getting-started/mocks/rest-api
// see: https://mswjs.io/docs/api/setup-worker

import { rest } from '@msw';
import { apiServer } from '@cpmd/helpers/global';
import { AsyncResponseResolverReturnType, MockedResponse } from '@msw';

expor const handlers = [
  // Get something
  rest.get(apiServer() + '/api/v1', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: 'something'
      })
    )
  })
]