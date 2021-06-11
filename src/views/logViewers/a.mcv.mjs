import m from 'mithril';

import { LogViewers } from './logViewers';
import { OpenEntities } from '../../models/openEntities/openEntities.mjs'
import { InstallLogViewerExample } from '../../models/openEntities/openEntities.example.logViewer.mjs'

export default {
  oninit: function(vnode) {
    OpenEntities.closeAllEntities()
    InstallLogViewerExample()
  },
  view: function(vnode) {
  	return m(LogViewers, {
  		entity: 'logViewerExample'
  	})
  }
}
