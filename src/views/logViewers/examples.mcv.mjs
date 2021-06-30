import m from 'mithril';

import { InstallMithrilExamples } from '../../../mcv/mithrilExamples.mjs'

import { LogViewers } from './logViewers';
import { OpenEntities } from '../../models/openEntities/openEntities.mjs'

export default {
  oninit: function(vnode) {
    OpenEntities.closeAllEntities()
    InstallMithrilExamples()
  },
  view: function(vnode) {
  	return m(LogViewers, {
  		entity: 'an example log file'
  	})
  }
}
