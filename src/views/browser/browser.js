import m from 'mithril';

// see: https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Styling_lists
// see: https://developer.mozilla.org/en-US/docs/Web/CSS/list-style

/////////////////////////////////////////////////////////////////////////////
// Setup the Fontawesome icons that we will use....
//

// see the section on 'deep imports' in the following page:
//   https://fontawesome.com/how-to-use/javascript-api/other/tree-shaking
//
import { icon         } from '@fortawesome/fontawesome-svg-core'
import { faBars       } from '@fortawesome/free-solid-svg-icons/faBars'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons/faCaretRight'
import { faCaretDown  } from '@fortawesome/free-solid-svg-icons/faCaretDown'

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

// see: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/use
//
function createHiddenSVGForLaterUse() {
  return m(
    'div',
    { hidden: true, class: 'hidden-svg-for-later-use' },
    m.trust(caretDown.html[0]),
    m.trust(caretRight.html[0]),
    m.trust(menuBars.html[0]),
  )
}
//
const iconWidth = 14 // just slightly less than 1em
function useIcon(useName, options={hidden: false, width: iconWidth }) {
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
// Now build the artifact browser....
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
