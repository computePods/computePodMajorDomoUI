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
  t.assert(Entities.hasOwnProperty('getEntityType'))
  t.assert(Entities.hasOwnProperty('getEntityValue'))
  t.assert(Entities.hasOwnProperty('markEntitySaved'))
  t.assert(Entities.hasOwnProperty('markEntityNeedsSaving'))
  t.assert(Entities.hasOwnProperty('closeEntity'))
  t.assert(Entities.hasOwnProperty('entitiesNeedingSaving'))
  t.assert(Entities.hasOwnProperty('closeAllEntities'))
})

test('theEntities', async function(t) {
  var Entities = t.context.Entities

	t.deepEqual(Entities.theEntities, {})

  Entities.openEntityWithTestData('silly', 'silly', 'sillyType', 'sillyValue')
  t.deepEqual(Entities.getEntityValue('silly'), 'sillyValue')
  t.deepEqual(Entities.getEntityType('silly'), 'sillyType')
  Entities.markEntityNeedsSaving('silly')

  Entities.openEntityWithTestData('sillier', 'sillier', 'sillierType', 'sillierValue')

  t.deepEqual(Entities.getEntityValue('silly'),   'sillyValue')
  t.deepEqual(Entities.getEntityType('silly'),   'sillyType')
  t.deepEqual(Entities.getEntityValue('sillier'), 'sillierValue')
  t.deepEqual(Entities.getEntityType('sillier'), 'sillierType')

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
	Entities.theEntities['silly'].model.getAllServerData = 'fakeFunction'
	Entities.theEntities['silly'].model.getChangedServerData = 'fakeFunction'
	t.deepEqual(Entities.theEntities, {
	  silly: {
	    name: 'silly',
	    needsSaving: true,
	    path: 'silly',
	    type: 'sillyType',
	    model: {
	     artefactPath: 'silly',
	     data: 'sillyValue',
	     entityName: 'silly',
	     entityType: 'sillyType',
	     getAllServerData: 'fakeFunction',
	     getChangedServerData: 'fakeFunction'
	    }
	  }
  })


  Entities.markEntitySaved('silly')
	Entities.closeAllEntities()
	t.deepEqual(Entities.theEntities, {})

})
