import m from 'mithril';

import { createHiddenSVGForLaterUse, useIcon } from '../utils.mjs'

// see: https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Styling_lists
// see: https://developer.mozilla.org/en-US/docs/Web/CSS/list-style

/////////////////////////////////////////////////////////////////////////////
// Now build the artefact browser....
//

// see: https://mithril.js.org/components.html#closure-component-state

const initiallyHiddenDefault = true
//const initiallyHiddenDefault = false

function MenuOnlyListEntry(initialVNode) {
  let hidden   = ('initialHidden' in initialVNode.attrs) ? initialVNode.attrs.initialHidden : initiallyHiddenDefault
  let thePath  = initialVNode.attrs.thePath || 'silly'
  let theName  = initialVNode.attrs.theName || 'sillier'
  let entryKey = thePath+'-'+theName
  let menuBarsSpan   = useIcon('menuBars',   { key: 'menuBars' })
  let textSpan       = m('span',             { key: 'text'}, theName)
  return {
    view: function(vnode) {
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
  }
}

function CloseableListEntry(initialVNode) {
  let hidden  =  ('initialHidden' in initialVNode.attrs) ? initialVNode.attrs.initialHidden : initiallyHiddenDefault
  let thePath =  initialVNode.attrs.thePath  || 'silly'
  let theModel = initialVNode.attrs.theModel || { }
  let entryKey = thePath+'-'+theModel.name
  let caretRightSpan = useIcon('caretRight', { key: 'caretRight', hidden: !initiallyHiddenDefault })
  let caretDownSpan  = useIcon('caretDown',  { key: 'caretDown',  hidden:  initiallyHiddenDefault })
  let menuBarsSpan   = useIcon('menuBars',   { key: 'menuBars' })
  let textSpan       = m('span',             { key: 'text'}, theModel.name)
  let dirModels = theModel.directories || {}
  let dirKeys   = Object.keys(dirModels).sort()
  let dirItems  = dirKeys.map(function(aDirKey) {
  	return m(
  	  CloseableListEntry,
  	  { thePath: entryKey, theModel: dirModels[aDirKey] }
  	)
  })
  let fileModels = theModel.files || {}
  let fileKeys   = Object.keys(fileModels).sort()
  let fileItems  = fileKeys.map(function(aFileKey) {
  	return m(
  	  MenuOnlyListEntry,
  	  { thePath: entryKey, theName: aFileKey }
  	)
  })
  function openCloseListEntry(anEvent) {
    console.log("Toggling CloseableListEntry::openCloseListEntry for "+entryKey)
    caretRightSpan.dom.hidden = !caretRightSpan.dom.hidden
    caretDownSpan.dom.hidden  = !caretDownSpan.dom.hidden
    dirItems.map(function(aDirItem) {
      aDirItem.dom.hidden = !aDirItem.dom.hidden
    })
    fileItems.map(function(aFileItem) {
      aFileItem.dom.hidden = !aFileItem.dom.hidden
    })
  }
  caretRightSpan.attrs.onclick = openCloseListEntry
  caretDownSpan.attrs.onclick = openCloseListEntry
  return {
  	view: function(vnode) {
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
  	      m('ul', { key: 'dirItems', class: 'artifact-browser' },  dirItems),
  	      m('ul', { key: 'fileItems', class: 'artifact-browser' }, fileItems),
  	    ]
  	  )
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
      	    CloseableListEntry,
      	    {
      	      thePath: 'silly',
      	      theModel: vnode.attrs.model,
      	      initialHidden: false,
      	    }
      	  )
      	)
      )
    }
  }
}
