#!/usr/bin/env node

// This node (JavaScript) watches the src directory for any changes to
// *.mcv.{cjs,js,mjs} files. Once a change has been detected it runs the
// `reBuildIndexJS` function to rebuild the `mcv/index.js` file.
//
// The `mcv/index.js` file contains a simple Mithril application to
// display each of the `*.mcv.{cjs,js,mjs}` Mithril components in a
// browser.

console.log("Creating Mithril Components Viewer\n")

const fg      = require('fast-glob')
const fs      = require('fs')
const path    = require('path')
const Sqrl    = require('squirrelly')
const watcher = require('@parcel/watcher')

const isMCV = new RegExp('\.mcv\.[mc]?js$')

function reBuildIndexJS() {
  console.log("rebuilding mcv/mcv.mjs")

  const srcEntries = fg.sync(['src/**/*.mcv.{cjs,js,mjs}'])

  var entries = {}
  for (var anEntry of srcEntries) {
    var parsedEntry = path.parse(anEntry)
    var viewDir = path.basename(parsedEntry.dir)
    var viewObj = path.parse(parsedEntry.name)['name']
    var entryName = viewDir +'_'+ viewObj
    entries[entryName] = {
    	entryName : entryName,
  	  viewDir   : viewDir,
    	viewObj   : viewObj,
    	route     : viewDir+'/'+viewObj,
  	  path      : anEntry
    }
  }

  var template = fs.readFileSync('mcv/mcv.mjs.template', { encoding: 'utf-8'});

  Sqrl.filters.define("capitalize", function(str) {
    str = str[0].toUpperCase() + str.substring(1)
    return str
  });

  var renderedStr = Sqrl.render(template, {
    entries : entries
  })
  fs.writeFileSync('mcv/mcv.mjs', renderedStr)

  console.log("")
}

reBuildIndexJS()

watcher.subscribe('src', function(err, events){
  if (err) {
  	console.log("---------------------------------------------------------")
  	console.error(err)
  	console.log("---------------------------------------------------------")
  } else {
    var foundMCV = false
    for (var anEvent of events) {
      if (isMCV.test(anEvent.path)) {
        var thePath = anEvent.path
        var cwd     = process.cwd()
        if (thePath.startsWith(cwd)) thePath = thePath.substring(cwd.length+1)
        console.log("  "+thePath)
        foundMCV = true
      }
    }
    if (foundMCV) reBuildIndexJS()
  }
}).then(text => {
  console.log("Watching for changes to the [src] directory\n")
}).catch(err => {
	console.error(err)
})


//////////////////////////////////////////////////////////////////////////

// for watching consider either:
//   https://github.com/parcel-bundler/watcher (used by parcel)
//   https://github.com/paulmillr/chokidar (used by ava, and nunjucks)

// for command line consider:
//   https://github.com/tj/commander.js

// for templates consider:
//   https://github.com/mozilla/nunjucks
//   https://github.com/squirrellyjs/squirrelly

//////////////////////////////////////////////////////////////////////////

