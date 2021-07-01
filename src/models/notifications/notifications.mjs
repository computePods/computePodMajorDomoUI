/*

*/

import m from 'mithril'

import { Artefacts     } from '../artefacts/artefacts.mjs'
import { OpenEntities  } from '../openEntities/openEntities.mjs'
import { EventSourceOn } from '../../eventSourcFactory.mjs'

function onMessage(evt) {
  if !evt.hasOwnProperty('data') return
  msg = evt.data

  if !msg.hasOwnProperty('notificationType') return
  notificationType = msg['notificationType']
  delete msg['notificationType']

  if !msg.hasOwnProperty('artefactPath')  return
  artefactPath = msg['artefactPath']

  switch(notificationType) {
  	case 'Added' :
  	  Artefacts.addNodeInfo(artefactPath, msg)
  	  break;
  	case 'Removed' :
  	  Artefacts.remmoveNode(artefactPath)
  	  OpenEntities.markEntitySaved(artefactPath)
  	  OpenEntities.closeEntity(artefactPath)
      break;
  	case 'Changed' :
  	    OpenEntities.updateEntity(artefactPath)
  	  break;
  }
}

export function SetupWebSocket() {
  theNotifications = EventSourceOn({ mountPoint: '/notifications' })
  if (theNotifications) {
    theNotifications.onMessage = onMessage
  }
}
