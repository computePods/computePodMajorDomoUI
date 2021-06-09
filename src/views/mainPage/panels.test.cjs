var mq = require('mithril-query')

var mt = require("../../mithril-testing.cjs")


/*
  The Panels component manages the "Panels" used by the SplitPanels View.

  This file contains the tests for the Panels component.
*/

mt.test('Panels', async function(t) {
  var panels = await import('./panels.mjs')
  //var MainPage = await import('./mainPage.mjs')

  console.log(typeof(panels.Panels))
  console.log(panels.Panels)

	t.truthy(panels.Panels.hasOwnProperty('thePanels'))
	t.truthy(panels.Panels.hasOwnProperty('createPanels'))
	t.truthy(panels.Panels.hasOwnProperty('openAPanel'))
	panels.Panels.createPanels(5,1)

  console.log(panels.Panels)
});
