import m from 'mithril';

import { Bsw } from '../../../mcv/mocks/browserServiceWorker.mjs'

import { LogViewers } from './logViewers';
import { OpenEntities } from '../../models/openEntities/openEntities.mjs'
import { InstallLogViewerExample } from '../../models/openEntities/openEntities.example.logViewer.mjs'

export default {
  oninit: function(vnode) {
    Bsw.start()
    OpenEntities.closeAllEntities()
    InstallLogViewerExample()
  },
  view: function(vnode) {
  	return m(LogViewers, {
  		entity: 'logViewerExample'
  	})
  }
}
