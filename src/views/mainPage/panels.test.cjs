var mq = require('mithril-query')

var mt = require("../../mithril-testing.cjs")

var Panels = import('./panels.mjs')
var MainPage = import('./mainPage.mjs')

/*
  The Panels component manages the "Panels" used by the SplitPanels View.

  This file contains the tests for the Panels component.
*/

mt.test('foo', t => {
	t.pass();
});

mt.test('foo2', t => {
	t.pass();
});

mt.test('bar', async t => {
	const bar = Promise.resolve('bar');
	t.is(await bar, 'bar');
});
