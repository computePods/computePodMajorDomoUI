const test = require('ava')

/*

The Panels model manages the "Panels" ultimately used by the SplitPanels
View.

This file contains the tests for the Panels model.

*/

test.before( async function(t) {
  var panelsModule = await import('./panels.mjs')
  t.context.Panels = panelsModule.Panels
  var localStorageModule = await import('../testLocalStorage.mjs')
  global.localStorage = localStorageModule.localStorage
})

test('Panels', async function(t) {
  var Panels = t.context.Panels

	t.assert(Panels.hasOwnProperty('thePanels'))
	t.assert(Panels.hasOwnProperty('reCreatePanels'))
	t.assert(Panels.hasOwnProperty('openAPanel'))
	t.assert(Panels.hasOwnProperty('closePanel'))
});

test("thePanels", async function(t) {

  // The thePanels should initially have no panels until after the call to
  // `reCreatePanels`

  var Panels = t.context.Panels

  localStorage.setItem('panel-sizes', JSON.stringify([ 25, 75 ]))
  t.is(Panels.thePanels.length, 0)

	Panels.reCreatePanels(5,1)

  t.is(Panels.thePanels.length, 5)

  t.false(Panels.thePanels[0].hidden)
  t.is(Panels.thePanels[0].entityName, "none")
  t.is(Panels.thePanels[0].size, 100)

  for (var i = 1; i<5; i++) {
  	t.true(Panels.thePanels[i].hidden)
    t.is(Panels.thePanels[i].entityName, "none")
    t.is(Panels.thePanels[i].size, 0)
  }

  Panels.reCreateSplitter()
  t.deepEqual(Panels.openPanelIDs,      ['#split-1'])
  t.deepEqual(Panels.openPanelSizes,    [ 100 ])
  t.deepEqual(Panels.openPanelMinSizes, [ 10 ])

  // openAPanel opens the next hidden panel
  Panels.openAPanel()

  t.false(Panels.thePanels[0].hidden)
  t.is(Panels.thePanels[0].entityName, "none")
  t.is(Panels.thePanels[0].size, 50)
  t.false(Panels.thePanels[1].hidden)
  t.is(Panels.thePanels[1].entityName, "none")
  t.is(Panels.thePanels[1].size, 50)

  for (var i = 2; i<5; i++) {
  	t.true(Panels.thePanels[i].hidden)
    t.is(Panels.thePanels[i].entityName, "none")
  }

  Panels.reCreateSplitter()
  t.deepEqual(Panels.openPanelIDs,      ['#split-1', '#split-2'])
  t.deepEqual(Panels.openPanelSizes,    [ 50, 50 ])
  t.deepEqual(Panels.openPanelMinSizes, [ 10, 10 ])

  // close the first panel
  Panels.closePanel(0)

  t.true(Panels.thePanels[0].hidden)
  t.is(Panels.thePanels[0].entityName, "none")
  t.is(Panels.thePanels[0].size, 0)
  t.false(Panels.thePanels[1].hidden)
  t.is(Panels.thePanels[1].entityName, "none")
  t.is(Panels.thePanels[1].size, 100)

  for (var i = 2; i<5; i++) {
  	t.true(Panels.thePanels[i].hidden)
    t.is(Panels.thePanels[i].entityName, "none")
    t.is(Panels.thePanels[i].size, 0)
  }

  Panels.reCreateSplitter()
  t.deepEqual(Panels.openPanelIDs,      [ '#split-2'])
  t.deepEqual(Panels.openPanelSizes,    [ 100 ])
  t.deepEqual(Panels.openPanelMinSizes, [ 10 ])

  // you are not allowed to close the last panel
  Panels.closePanel(1)

  t.true(Panels.thePanels[0].hidden)
  t.is(Panels.thePanels[0].entityName, "none")
  t.is(Panels.thePanels[0].size, 0)
  t.false(Panels.thePanels[1].hidden)
  t.is(Panels.thePanels[1].entityName, "none")
  t.is(Panels.thePanels[1].size, 100)

  for (var i = 2; i<5; i++) {
  	t.true(Panels.thePanels[i].hidden)
    t.is(Panels.thePanels[i].entityName, "none")
    t.is(Panels.thePanels[i].size, 0)
  }

  Panels.reCreateSplitter()
  t.deepEqual(Panels.openPanelIDs,      [ '#split-2'])
  t.deepEqual(Panels.openPanelSizes,    [ 100 ])
  t.deepEqual(Panels.openPanelMinSizes, [ 10 ])

})
