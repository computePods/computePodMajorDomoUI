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
  var Entities = t.context.Entities

  t.assert(Entities.hasOwnProperty('compileMenu'))
  t.assert(Entities.hasOwnProperty('openEntity'))
  t.assert(Entities.hasOwnProperty('getEntity'))
  t.assert(Entities.hasOwnProperty('markEntitySaved'))
  t.assert(Entities.hasOwnProperty('markEntityNeedsSaving'))
  t.assert(Entities.hasOwnProperty('closeEntity'))
  t.assert(Entities.hasOwnProperty('entitiesNeedingSaving'))
  t.assert(Entities.hasOwnProperty('closeAllEntities'))
})

test('theEntities', async function(t) {
  var Entities = t.context.Entities

	t.deepEqual(Entities.theEntities, {})

  Entities.openEntity('silly', 'sillyValue')
  t.deepEqual(Entities.getEntity('silly'), 'sillyValue')
  Entities.markEntityNeedsSaving('silly')

  Entities.openEntity('sillier', 'sillierValue')

  t.deepEqual(Entities.getEntity('silly'),   'sillyValue')
  t.deepEqual(Entities.getEntity('sillier'), 'sillierValue')

  var theMenu = Entities.compileMenu(
    [ { link: 'sillyMenuLink', text: 'sillyMenuText'} ],
    function(eName) { console.log(eName)}
  )
  var theTexts = theMenu.map((anItem) => anItem.text)
  t.deepEqual(theTexts, [ 'sillyMenuText', '', 'silly', 'sillier' ])
  t.is(typeof(theMenu[0].link),  'string')
  t.is(typeof(theMenu[1].link), 'boolean')
  t.is(typeof(theMenu[2].link), 'function')
  t.is(typeof(theMenu[3].link), 'function')

  t.deepEqual(Entities.entitiesNeedingSaving(), ['silly'])

  // we should not be able to close any entities which still need saving

  t.false(Entities.closeEntity('silly'))
  t.true(Entities.closeEntity('sillier'))

	Entities.closeAllEntities()
	t.deepEqual(Entities.theEntities, {
	  silly: { needsSaving: true, value: 'sillyValue' }
  })


  Entities.markEntitySaved('silly')
	Entities.closeAllEntities()
	t.deepEqual(Entities.theEntities, {})

})
