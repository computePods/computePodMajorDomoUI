import m from 'mithril';


// see: https://www.w3schools.com/howto/howto_js_treeview.asp

// see: https://bulma.io/documentation/elements/icon/#font-awesome-variations

export const Browser = (outterVnode) => {

  function addDirectories(thePath, theModel, newVNodes) {
  	if (theModel.hasOwnProperty('directories')) {
  	  let vnodeItems = [];
  	  for (let aDir in theModel.directories) {
        console.log(aDir)
        var dirKey = thePath+'-'+aDir
  	    let someVNodes = buildBrowser(dirKey, theModel.directories[aDir])
        let caretSpan =  m('span',
  	        {
  	          class: 'caret',
  	          id: dirKey,
  	          key: dirKey,
  	          onclick: function(e) {
  	      	    let nestedElements = someVNodes
  	      	    console.log(someVNodes)
  	      	    someVNodes.forEach(function(anElement) {
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
  	        class: ['hbrowser', 'hdir '],
  	        key: dirKey+'li',
            hidden: false,
  	      },
  	      [caretSpan, ...someVNodes]
  	    ))
  	  }
  	  console.log("////////////")
  	  console.log(vnodeItems)
  	  console.log("////////////")
  	  var theKey = thePath+'-dirs'
  	  newVNodes.push(m('ul',
  	    { 
  	      class: 'hbrowser hdirs nested '+theKey,
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
      console.log(vnode.attrs.model)
      console.log("-------------------------------------")
      console.log(vnode)
      console.log("-------------------------------------")
      let theBody = buildBrowser("aretifact-browser", vnode.attrs.model)
      console.log("=====================================")
      console.log(theBody)
      console.log("=====================================")
      return theBody
    }
  }
}