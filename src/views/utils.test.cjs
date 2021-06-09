var mt = require("../mithril-testing.cjs")

mt.test("utils import", async function(t) {

  var utils = await import("./utils.mjs")

  // need to test createLinkFromItem
  //console.log(utils)

  t.truthy(utils.createHiddenSVGForLaterUse)

  var svgForLaterUse = mt.mq(utils.createHiddenSVGForLaterUse())
  svgForLaterUse.should.have('.hidden-svg-for-later-use')
  svgForLaterUse.should.have('.svg-inline--fa')
  svgForLaterUse.should.have('.fa-caret-down')
  svgForLaterUse.should.have('.fa-caret-right')
  svgForLaterUse.should.have('.fa-bars')

  t.truthy(utils.useIcon)

  var menuBars = mt.mq(utils.useIcon('menuBars'))
  menuBars.should.have('span')
  menuBars.should.have('.svg-inline--fa')
  menuBars.should.have('use')
  menuBars.should.have('[href]')
  t.is(mt.getAttr(menuBars, 'use', 'href'), '#menuBars')

  var caretDown = mt.mq(utils.useIcon('caretDown'))
  caretDown.should.have('span')
  caretDown.should.have('.svg-inline--fa')
  caretDown.should.have('use')
  caretDown.should.have('[href]')
  t.is(mt.getAttr(caretDown, 'use', 'href'), '#caretDown')

  var caretRight = mt.mq(utils.useIcon('caretRight'))
  caretRight.should.have('span')
  caretRight.should.have('.svg-inline--fa')
  caretRight.should.have('use')
  caretRight.should.have('[href]')
  t.is(mt.getAttr(caretRight, 'use', 'href'), '#caretRight')
})

