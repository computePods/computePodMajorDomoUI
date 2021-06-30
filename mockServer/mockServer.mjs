// see: https://github.com/AckerApple/ack-reload
// alternative: https://github.com/alallier/reload

// see: http://expressjs.com/

import express from 'express'
import http    from 'http'
import path    from 'path'
import reload  from 'ack-reload'

import { All_handlers } from '../src/interfaces/AllMockServerExamples.mjs'

const __dirname  = path.dirname(new URL(import.meta.url).pathname);
const distMCVdir = path.normalize(path.join(__dirname, '..', 'distMCV'))
const app = express()
const port = 1234

app.use('/clientApp', express.static(distMCVdir))

All_handlers(app)

app.get('/', (req, res) => {
  res.sendFile(path.join(distMCVdir, 'mcv.html'))
})

// Create the HTTP server
//
const server = http.createServer((req,res) => {
  if( reload.isRequestForReload(req) ) {
    midware(req, res)
  } else {
    app(req,res)
  }
})

//watch files, create websocket. Return function to process requests
//
const midware = reload.middleware(distMCVdir, server, {
  onReload:function(){
    console.log('Mock server reloaded at '+new Date().toString())
  }
})

// at this point we have server and app and reload code
//
server.listen(port, () => {
	console.log(`Mock server listening at http://localhost:${port}/mcv.html`)
})