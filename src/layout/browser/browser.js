import m from 'mithril';

import { library, icon } from '@fortawesome/fontawesome-svg-core'
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars'

// see: https://www.w3schools.com/howto/howto_js_treeview.asp

// see: https://bulma.io/documentation/elements/icon/#font-awesome-variations

//library.add(faBars)
//const menuBars = icon({prefix: 'fas', iconName: 'bars'})
const menuBars = icon(faBars, {
  attributes: { 'id': 'delete' }
})

export const Browser = (outterVnode) => {

  function addDirectories(thePath, theModel, newVNodes) {
  	if (theModel.hasOwnProperty('directories')) {
  	  let vnodeItems = [];
  	  for (let aDir in theModel.directories) {
        console.log(aDir)
        let dirKey = thePath+'-'+aDir
  	    let vNodesToHide = buildBrowser(dirKey, theModel.directories[aDir])
        let caretSpan =  m('span',
  	        {
  	          class: 'artifact-browser arrow-down',
  	          id: dirKey,
  	          key: dirKey,
  	          onclick: function(e) {
  	      	    console.log(vNodesToHide)
  	      	    vNodesToHide.forEach(function(anElement) {
  	      	      console.log(anElement)
  	      	      anElement.dom.hidden = !anElement.dom.hidden
  	      	    });
                caretSpan.dom.classList.toggle("caret-down");
  	      	  },
  	        },
  	        "dir: "+thePath+'-'+aDir,
  	      );
  	    vnodeItems.push(m('li',
  	      { 
  	        class: ['artifact-browser', 'a-dir '],
  	        key: dirKey+'li',
            hidden: false,
  	      },
  	      [caretSpan, ...vNodesToHide]
  	    ))
  	  }
  	  var theKey = thePath+'-dirs'
  	  newVNodes.push(m('ul',
  	    { 
  	      class: 'artifact-browser a-dirs '+theKey,
  	      id: theKey,
  	      key: theKey,
  	    },
  	    vnodeItems
  	  ))
  	}
  }
  
  function addFiles(thePath, theModel, newVNodes) {
  	if (theModel.hasOwnProperty('files')) {
  	  let vnodeItems = [];
  	  for (let aFile in theModel.files) {
        console.log(aFile)
        let theKey = thePath+'-'+aFile
  	    vnodeItems.push(m('li',
  	      { class: 'hbrowser hfile '+theKey, key: theKey },
          [ "file: ", thePath, '-', aFile ]
  	    ))
  	  }
  	  let theKey = thePath+'-files'
  	  newVNodes.push(m('ul',
  	    { class: 'hbrowser hfiles '+theKey, key: theKey},
  	    vnodeItems
  	  ))
  	}
  }
  
  function buildBrowser(thePath, theModel) {
  	var newVNodes = [];
    console.log("->->->->->->->->->->->->->->->->->->-")
    console.log(thePath)
    console.log(theModel)
    addDirectories(thePath, theModel, newVNodes)
    addFiles(thePath, theModel, newVNodes)
  	console.log(newVNodes)
    console.log("-<-<-<-<-<-<-<-<-<-<-<-<-<-<-<-<-<-<-")
  	return newVNodes
  }
  return {
    view: (vnode) => { 
      console.log("-------------------------------------")
      console.log(faBars)
      console.log(icon(faBars))
      console.log(menuBars)
      console.log("-------------------------------------")
      console.log("-------------------------------------")
      console.log(vnode.attrs.model)
      console.log("-------------------------------------")
      console.log(vnode)
      console.log("-------------------------------------")
      let theBody = buildBrowser("aretifact-browser", vnode.attrs.model)
      console.log("=====================================")
      console.log(theBody)
      console.log("=====================================")
      //let svgHtml = icon(faBars).html[0].replace('class=', 'id=\"delete\" class=')
      let svgHtml = menuBars.html[0]
      let menuBarsSVG = m.trust('<span hidden>'+svgHtml+'</span>')
      console.log(menuBarsSVG)
      // see: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/use
      // deep imports: https://fontawesome.com/how-to-use/javascript-api/other/tree-shaking
      // abstract icon: https://fontawesome.com/how-to-use/javascript-api/methods/icon
      return m(
      	'div',
      	{},
      	menuBarsSVG,
      	m.trust(`<span><svg class="svg-inline--fa fa-w-14"><use xlink:href="#delete"></use></svg></span>`),
        theBody
      )
    }
  }
}