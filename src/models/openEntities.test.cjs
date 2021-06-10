const test = require('ava')

/*

The OpenEntities model manages the entities currently opened for use in
the MajorDomo client application.

This file contains the tests for the OpenEntities model.

*/

test.before( async function(t) {
  var entitiesModule = await import('./openEntities.mjs')
  t.context.Entities = entitiesModule.OpenEntities
})

test('OpenEntities', async function(t) {
  t.pass()
})
