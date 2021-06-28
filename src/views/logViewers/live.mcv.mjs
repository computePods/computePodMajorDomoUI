import m from 'mithril';

import { InstallBswExamples, Bsw } from '../../../mcv/browserServiceWorker.mjs'

import { LogViewers } from './logViewers';
import { OpenEntities } from '../../models/openEntities/openEntities.mjs'

export default {
  oninit: function(vnode) {
    Bsw.stop()
    OpenEntities.closeAllEntities()
    InstallBswExamples()
  },
  view: function(vnode) {
  	return m(LogViewers, {
  		entity: 'an example log file'
  	})
  }
}