/*

*/

import log from 'loglevel'

import { Artefacts     } from '../artefacts/artefacts.mjs'
import { OpenEntities  } from '../openEntities/openEntities.mjs'
import { EventSourceOn } from '../../eventSourceFactory.mjs'
import { buildArtefactPath } from '../../interfaces/AllHttpRouteUtils.mjs'

function onMessage(evt) {
  msg = JSON.parse(evt.data)

  if (!msg.hasOwnProperty('notificationType')) return
  notificationType = msg['notificationType']
  delete msg['notificationType']

  if (!msg.hasOwnProperty('routeParts'))  return
  artefactPath = buildArtefactPath(msg['routeParts'])

  switch(notificationType) {
  	case 'Added' :
  	  log.info("Notifications: Added artefactPath: ["+artefactPath+"]")
  	  Artefacts.addNodeInfo(artefactPath, msg)
  	  break;
  	case 'Removed' :
  	  log.info("Notifications: Removed artefactPath: ["+artefactPath+"]")
  	  Artefacts.remmoveNode(artefactPath)
  	  OpenEntities.markEntitySaved(artefactPath)
  	  OpenEntities.closeEntity(artefactPath)
      break;
  	case 'Changed' :
	    if (artefactPath) {
 	      log.info("Notifications: Changed artefactPath: ["+artefactPath+"]")
 	      OpenEntities.updateEntity(artefactPath)
 	    } else {
 	    	log.info("Notifications: Changed NO ARTEFACT PATH")
 	    	if (!msg.hasOwnProperty('mountPoint')) return
 	    	var mountPoint = msg['mountPoint']
 	    	log.info("Notifications: Changed mountPoint: ["+mountPoint+"]")
 	    }
  	  break;
  }
}

export const Notifications =
  EventSourceOn(
    { mountPoint: '/notifications' },
    { onMessage: onMessage }
  )
