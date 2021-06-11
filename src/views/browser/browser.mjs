import m from 'mithril';

import { createHiddenSVGForLaterUse, useIcon } from '../utils.mjs'

import { Artefacts } from '../../models/artefacts.mjs'

// see: https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Styling_lists
// see: https://developer.mozilla.org/en-US/docs/Web/CSS/list-style

/////////////////////////////////////////////////////////////////////////////
// Now build the artefact browser....
//

// see: https://mithril.js.org/components.html#closure-component-state

const initiallyHiddenDefault = true
//const initiallyHiddenDefault = false

function viewMenuOnlyListEntry(aPath, aNode) {
  let hidden   = initiallyHiddenDefault
  let entryKey = aPath.join('-')
  let menuBarsSpan   = useIcon('menuBars',   { key: 'menuBars' })
  let textSpan       = m('span',             { key: 'text',       class: 'artifact-browser-text'}, aPath[aPath.length-1])
  return m(
    'li',
    {
      key: entryKey+'-li',
      class: 'artifact-browser',
      hidden: hidden,
    },
    [
      menuBarsSpan,
      textSpan,
    ]
  )
}

function viewCloseableListEntry(aPath, aNode, branches) {
  let hidden  =  initiallyHiddenDefault
  let entryKey = aPath.join('-')
  let caretRightSpan = useIcon('caretRight', { key: 'caretRight', hidden: !initiallyHiddenDefault })
  let caretDownSpan  = useIcon('caretDown',  { key: 'caretDown',  hidden:  initiallyHiddenDefault })
  let menuBarsSpan   = useIcon('menuBars',   { key: 'menuBars' })
  let textSpan       = m('span',             { key: 'text',       class: 'artifact-browser-text'}, (0 < aPath.length ? aPath[aPath.length-1] : '/'))
  function openCloseListEntry(anEvent) {
    console.log("Toggling CloseableListEntry::openCloseListEntry for "+entryKey)
    caretRightSpan.dom.hidden = !caretRightSpan.dom.hidden
    caretDownSpan.dom.hidden  = !caretDownSpan.dom.hidden
    branches.map(function(anItem) {
      anItem.dom.hidden = !anItem.dom.hidden
    })
  }
  caretRightSpan.attrs.onclick = openCloseListEntry
  caretDownSpan.attrs.onclick = openCloseListEntry
  return m(
    'li',
    {
      key: entryKey+'-li',
      class: 'artifact-browser',
      hidden: hidden,
    },
    [
      caretRightSpan,
      caretDownSpan,
      menuBarsSpan,
      textSpan,
      m('ul', { key: 'items', class: 'artifact-browser' },  branches),
    ]
  )
}

function BuildBrowser(initialVnode) {
  return {
  	view: function(vnode) {
  	  var theBrowser = Artefacts.walkOverArtefacts(
  		  viewCloseableListEntry, // branch function
  			viewMenuOnlyListEntry   // leaf function
  		)
  		theBrowser.attrs.hidden = false
  	  return theBrowser
  	}
  }
}

export const Browser = (initialVnode) => {
  return {
    view: (vnode) => {
      return m(
      	'div',
      	{},
      	createHiddenSVGForLaterUse(),
      	m('ul',
      	  m(
      	    BuildBrowser,
      	  )
      	)
      )
    }
  }
}
