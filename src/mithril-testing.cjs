// The following has been adapted from mithril testing:
//   see: https://mithril.js.org/testing.html

var test = require('ava')

var jsdom = require('jsdom')

var dom = new jsdom.JSDOM("",{
  // So we can get `requestAnimationFrame`
  pretendToBeVisual: true,
})

// Fill in the globals Mithril needs to operate. Also, the first two are often
// useful to have just in tests.
global.window = dom.window
global.document = dom.window.document
global.requestAnimationFrame = dom.window.requestAnimationFrame

// Require Mithril to make sure it loads properly.
// var m = require('mithril')


// And now, make sure JSDOM ends when the tests end.
test.after.always(function() {
    dom.window.close()
})

var mq = require('mithril-query')

const formatHtml = require('pretty-html-log').highlight

function logHtml(anEl) {
	return formatHtml(anEl.outerHTML)
}

function getAttr(mqObj, selector, attrName) {
  var result = true
  try {
  	result = mqObj.find(selector)[0]._attrsByQName[attrName]['data']
  } catch(err) {
  	throw new Error(
  		'Could not find the ['+ attrName+'] attribute in ['+ selector+']\n'
  	)
  }
	return result
}

exports.test    = test
exports.mq      = mq
exports.logHtml = logHtml
exports.getAttr = getAttr
