// This is a mock HTTP server used to serve the Mithril Component Viewer
// It is built using Express
//
// see: http://expressjs.com/

// Since this is a development server we explicitly use our own SSE based
// reloader

import express    from 'express'
import sseExpress from 'sse-express'
import http       from 'http'
import path       from 'path'
import sleep      from 'sleep-promise'

import { All_handlers } from '../src/interfaces/AllMockServerExamples.mjs'

const __dirname  = path.dirname(new URL(import.meta.url).pathname);
const distMCVdir = path.normalize(path.join(__dirname, '..', 'distMCV'))
const port = 1234

// Create the websocket-less application
//
const app = express()

// Create the HTTP server
// We really (eventually) want an HTTP/2 secure server...
// see: https://nodejs.org/dist/latest-v14.x/docs/api/http2.html#http2_server_side_example
// This *will* be needed when we have 5-6 SSE connections open at once...
//
const server = http.createServer(app)

// Now monkey-patch the application using sseExpress
//
app.sse = function addSseMethod(route, ...middleWares) {
  console.log("Adding new SSE for route ["+route+"]")
  var finalMiddleWare = middleWares.pop()
  var jsonData = {}
  var jsonCapture = {
  	json: function(someJson) { jsonData = someJson }
  }
	this.get(route, sseExpress(), ...middleWares, function(req, res){
	  console.log("opening SSE route ["+route+"]")
    finalMiddleWare(req, jsonCapture)
    if (!Array.isArray(jsonData)) {
      jsonData = [ jsonData ]
    }
    for (var anItem of jsonData) {
      console.log("sending JSONData item:")
      console.log(anItem)
      var payload = {
      	data: JSON.stringify(anItem)
      }
      //if (anItem.hasOwnProperty('notificationType')) {
      //	payload['event'] = anItem['notificationType']
      //}
      console.log(payload)
      res.sse(payload)
      // sleep a random amount of time (needs async!!!)
    }
    res.sse({
    	event: 'close'
    })
	})
}

app.use('/clientApp', express.static(distMCVdir))

All_handlers(app)

app.get('/', (req, res) => {
  res.sendFile(path.join(distMCVdir, 'mcv.html'))
})

// Explicitly create our own /heartBeat SSE handler...
// This makes explicit use of an asynchronous sleep...
// see: https://zellwk.com/blog/async-await-express/
//
app.get('/heartBeat', sseExpress(), async function(req, res, next) {
	console.log("Adding new SSE for route [/heartBeat]")
	try {
    while (true) {
      //console.log("Sending HeartBeat")
    	res.sse({
    		data: 'Hello'
    	})
    	await sleep(1000)
    }
	} catch (error) {
		return next(error)
	}
})

// at this point we have server and app and reload code
//
server.listen(port, () => {
	console.log(`Mock server listening at http://localhost:${port}`)
})
