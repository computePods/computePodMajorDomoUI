// The MajorDomo ServerSentEvents (sse) client interface provides a simple
// wrapper around the browser's standard EventSource interface.
//
// see: https://developer.mozilla.org/en-US/docs/Web/API/EventSource


import { buildUrl, sseMountPoints } from './interfaces/AllHttpRouteUtils.mjs'

export function EventSourceOn(entityUrlParts) {
  if (!entityUrlParts.hasOwnProperty('mountPoint')) return null
  if (!sseMountPoints.hasOwnProperty(entityUrlParts['mountPoint'])) return null

  function onOpen(evt) {
	  console.log("EventSource "+ entityUrlParts['mountPoint'] +" opened"
  }

  function onClose(evt) {
	  console.log("EventSource "+ entityUrlParts['mountPoint'] + " closed")
  }

  function onError(evt) {
	  console.log("EventSource "+ entityUrlParts['mountPoint'] + "ERROR: ")
	  console.log(evt.data)
	  console.log("EventSource error ignored")
  }

  function onMessage(evt) {
	  console.log("EventSource "+ entityUrlParts['mountPoint'] + "MSG:")
	  console.log(evt.data)
	  console.log("EventSource MSG ----------------------")
  }

  var theEventSource = new EventSource(buildUrl(entityUrlParts))
  theEventSource.onopen = onOpen
  theEventSource.onclose = onClose
  theEventSource.onerror = onError
  theEventSource.onmessage = onMessage
  return theEventSource
}
