// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiUrlEndpoint: 'http://localhost:53305',
  googleCustomSearchUrlEndpoint: 'https://www.googleapis.com/customsearch/v1?q=[SEARCH_TERM]&cx=005863448098847757980:hxez_lk5jy8&searchType=image&key=AIzaSyCZ0ok4aOSW31dz0TGa34Aegv-s-BrysCw&start=[PAGE_START]&fields=items%2Flink',
  stripePublishableKey: 'pk_test_0Opnf68xnyT0RVyCQjqw0ScB',
  googleAnalytics: {
    web: 'UA-102909242-5',
    ios: 'UA-102909242-6',
    chromeExtension: 'UA-102909242-7'
  },
  hostUrlForSharingToWeb: 'http://localhost:4200'
};
