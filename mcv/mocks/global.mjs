// based on: https://github.com/josephspurrier/mithril-template

export const Global = {
  apiScheme: __API_SCHEME__,
  apiHost: __API_HOST__,
  apiPort: __API_PORT__,
  version: __VERSION__,
  production: __PRODUCTION__,
  mockServer: __MOCK_SERVER__,
};

export const apiServer = (): string => {
  return `${Global.apiScheme}://${Global.apiHost}:${Global.apiPort}`;
};
