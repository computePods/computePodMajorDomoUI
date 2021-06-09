import m from 'mithril';

/////////////////////////////////////////////////////////////////////////////
// Setup the Fontawesome icons that we will use....
//

// see the section on 'deep imports' in the following page:
//   https://fontawesome.com/how-to-use/javascript-api/other/tree-shaking
//
import { library, icon } from '@fortawesome/fontawesome-svg-core'
import { faBars       } from '@fortawesome/free-solid-svg-icons/faBars.js'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons/faCaretRight.js'
import { faCaretDown  } from '@fortawesome/free-solid-svg-icons/faCaretDown.js'

library.add(faBars, faCaretRight, faCaretDown)

// see the section on 'abstract icons' in the following page:
//   https://fontawesome.com/how-to-use/javascript-api/methods/icon
//
const caretDown = icon(faCaretDown, {
  attributes: { 'id': 'caretDown' }
})
const caretRight = icon(faCaretRight, {
  attributes: { 'id': 'caretRight' }
})
const menuBars = icon(faBars, {
  attributes: { 'id': 'menuBars' }
})
//
const knownIconIDs = 'caretDown caretRight menuBars'
const iconWidth = 14 // just slightly less than 1em

// see: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/use
//
export function createHiddenSVGForLaterUse() {
  return m(
    'div',
    { hidden: true, class: 'hidden-svg-for-later-use' },
    m.trust(caretDown.html[0]),
    m.trust(caretRight.html[0]),
    m.trust(menuBars.html[0]),
  )
}

export function useIcon(useName, options={hidden: false, width: iconWidth }) {
  if (knownIconIDs.indexOf(useName) < 0) {
  	console.log('useIcon: unknown icon name: ['+useName+']')
  }
  var theKey = ('key' in options) ? options['key'] : undefined
  delete options.key
  var hidden = ('hidden' in options) ? options['hidden'] : false
  delete options.hidden
  var width  = options['width'] || 14
  delete options.width
  var theClass = ('class' in options) ? options['class'] : ""
  theClass = theClass.split(' ')
  if (!theClass.includes('no-fa-w')) {
  	theClass.unshift('fa-w-'+width)
  }
  if (!theClass.includes('no-svg-inline--fa')) {
  	theClass.unshift('svg-inline--fa')
  }
  options['class'] = theClass.join(' ')
  return m(
    'span',
    { hidden: hidden, key: theKey },
    m(
      'svg',
      options,
      m('use', { 'xlink:href': "#"+useName }, [])
    )
  )
}

/////////////////////////////////////////////////////////////////////////////
// link creation

export function createLinkFromItem(anItem) {
  if ('link' in anItem && 'text' in anItem) {
    let classStr = anItem.class || "navbar-item"
    if (typeof anItem.link == 'function') {
      return m('span', { 'class': classStr, 'onclick': anItem.link }, anItem.text)
    } else if (typeof anItem.link == 'string') {
      return m('a', { 'class': classStr, 'href': anItem.link }, anItem.text)
    } else if (typeof anItem.link == 'boolean') {
      return m('hr', { 'class':'navbar-divider'})
    }
  }
  return m('span')
}
