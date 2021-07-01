// This is a mock HTTP server used to serve the Mithril Component Viewer
// It is built using Express
//
// see: http://expressjs.com/


// Since this is a development server we explicitly use a reloader
//
// see: https://github.com/AckerApple/ack-reload
// alternative: https://github.com/alallier/reload

import express    from 'express'
import sseExpress from 'sse-express'
import http       from 'http'
import path       from 'path'
import reload     from 'ack-reload'

import { All_handlers } from '../src/interfaces/AllMockServerExamples.mjs'

const __dirname  = path.dirname(new URL(import.meta.url).pathname);
const distMCVdir = path.normalize(path.join(__dirname, '..', 'distMCV'))
const port = 1234

// Create the websocket-less application
//
const app = express()

// Create the HTTP server
//
const server = http.createServer((req,res) => {
  if( reload.isRequestForReload(req) ) {
    midware(req, res)
  } else {
    app(req,res)
  }
})

// Now monkey-patch the application using sseExpress
//
app.sse = function addSseMethod(route, ...middleWares) {
  var finalMiddleWare = middleWares.pop()
  var jsonData = {}
  var jsonCapture = {
  	json: function(someJson) { jsonData = someJson }
  }
	this.get(route, sseExpress(), ...middleWares, function(req, res){
    finalMiddleWare(req, jsonCapture)
    if (!Array.isArray(jsonData)) {
      jsonData = [ jsonData ]
    }
    for (var anItem of jsonData) {
      var payload = {
      	data: json.stringify(anItem)
      }
      if (anItem.hasObjectProperty('notificationType')) {
      	payload['event'] = anItem['notificationType']
      }
      res.sse(payload)
      // sleep a random amount of time (needs async!!!)
    }
	})
}

//watch files, create websocket. Return function to process requests
//
const midware = reload.middleware(distMCVdir, server, {
  onReload:function(){
    console.log('Mock server reloaded at '+new Date().toString())
  }
})

app.use('/clientApp', express.static(distMCVdir))

All_handlers(app)

app.get('/', (req, res) => {
  res.sendFile(path.join(distMCVdir, 'mcv.html'))
})

// at this point we have server and app and reload code
//
server.listen(port, () => {
	console.log(`Mock server listening at http://localhost:${port}/mcv.html`)
})