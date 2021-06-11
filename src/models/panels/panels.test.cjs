const test = require('ava')

/*

The Panels model manages the "Panels" ultimately used by the SplitPanels
View.

This file contains the tests for the Panels model.

*/

test.before( async function(t) {
  var panelsModule = await import('./panels.mjs')
  t.context.Panels = panelsModule.Panels
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

  t.is(Panels.thePanels.length, 0)

	Panels.reCreatePanels(5,1)

  t.is(Panels.thePanels.length, 5)

  t.false(Panels.thePanels[0].hidden)
  t.is(Panels.thePanels[0].theEntity, "none")

  for (var i = 1; i<5; i++) {
  	t.true(Panels.thePanels[i].hidden)
    t.is(Panels.thePanels[i].theEntity, "none")
  }

  // openAPanel opens the next hidden panel
  Panels.openAPanel()

  t.false(Panels.thePanels[0].hidden)
  t.is(Panels.thePanels[0].theEntity, "none")
  t.false(Panels.thePanels[1].hidden)
  t.is(Panels.thePanels[1].theEntity, "none")

  for (var i = 2; i<5; i++) {
  	t.true(Panels.thePanels[i].hidden)
    t.is(Panels.thePanels[i].theEntity, "none")
  }

  // close the first panel
  Panels.closePanel(0)

  t.true(Panels.thePanels[0].hidden)
  t.is(Panels.thePanels[0].theEntity, "none")
  t.false(Panels.thePanels[1].hidden)
  t.is(Panels.thePanels[1].theEntity, "none")

  for (var i = 2; i<5; i++) {
  	t.true(Panels.thePanels[i].hidden)
    t.is(Panels.thePanels[i].theEntity, "none")
  }

  // you are not allowed to close the last panel
  Panels.closePanel(1)

  t.true(Panels.thePanels[0].hidden)
  t.is(Panels.thePanels[0].theEntity, "none")
  t.false(Panels.thePanels[1].hidden)
  t.is(Panels.thePanels[1].theEntity, "none")

  for (var i = 2; i<5; i++) {
  	t.true(Panels.thePanels[i].hidden)
    t.is(Panels.thePanels[i].theEntity, "none")
  }
})
