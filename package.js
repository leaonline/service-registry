/* eslint-env meteor */
Package.describe({
  name: 'leaonline:service-registry',
  version: '1.0.0',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
})

Package.onUse(function (api) {
  api.versionsFrom('1.10.2')
  api.use('ecmascript')
  api.use('check')
  api.use('ejson')
  api.mainModule('service-registry-server.js', 'server')
  api.mainModule('service-registry-client.js', 'client')
})

Package.onTest(function (api) {
  api.use('ecmascript')
  api.use('tinytest')
  api.use('leaonline:service-registry')
  api.mainModule('service-registry-tests.js')
})
