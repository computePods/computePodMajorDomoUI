// A simple heartBeat/reload system.

// We open an EventSource (Server Sent Event stream) to the server
// ('/heartBeat') and wait for it to close (because the server is
// reloading). We then set a timer to attempt a reconnection. Once we have
// successfully reconnected we reload the page.


// We use the Page Visibility API to detect when the app is visible/hidden
// (and hence should/should-not reload)
// see: https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API

// In the future we might want to add the evolving Page Lifecycle API
// see: https://wicg.github.io/page-lifecycle/
// see: https://developers.google.com/web/updates/2018/07/page-lifecycle-api#overview_of_page_lifecycle_states_and_events

import log from 'loglevel'

import { EventSourceOn } from './eventSourceFactory.mjs'

var hasOpenedOnce  = false
var isVisible      = false
var reConnectTimer = null
var heartBeat      = null

window.addEventListener('visibilitychange', function () {
  isVisible = ! document.hidden
  //log.debug("MajorDomoUI visibility "+isVisible.toString())
})

function startReconnectTimer() {
  stopReconnectTimer()
  //log.debug("Starting reconnect timer")
  reConnectTimer = setTimeout(reConnect, 250)
}

function stopReconnectTimer() {
  if (reConnectTimer) {
    //log.debug("Stopping reconnect timer")
  	clearTimeout(reConnectTimer)
  	reConnectTimer = null
  }
}

function closeHeartBeat() {
  //log.debug("Closing heartBeat connection")
  if (heartBeat) {
    heartBeat.stop()
    heartBeat = null
  }
}

function reConnect() {
  closeHeartBeat()
  log.debug("Reconnecting to heartBeat")
  heartBeat = EventSourceOn(
  	{ mountPoint: "/heartBeat"},
  	{
  		onOpen: onOpen,
  		onClose: onClose,
  		onError: onError,
  		onMessage: onMessage
  	}
  )
  heartBeat.start()
}

function reload() {
  log.debug("Reloading window")
  /*if (isVisible)*/ window.location.reload()
}

function onOpen(evt) {
  stopReconnectTimer()
  //log.debug("HeartBeat connection open")
  if (hasOpenedOnce) {
    reload()
  } else {
  	hasOpenedOnce = true
  }
}

function onClose(evt) {
  //log.debug("HeartBeat connection closing")
  closeHeartBeat()
}

function onError(evt) {
  //log.debug("HeartBeat connection error")
  startReconnectTimer()
}

function onMessage(evt) {
  //log.debug("HeartBeat connection message")
  // ignore...
  // var msg = JSON.parse(evt.data)
}

export const HeartBeatReload = startReconnectTimer
