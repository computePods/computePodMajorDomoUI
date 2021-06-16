import m from 'mithril';

import { InstallBswExamples, Bsw } from '../../../mcv/browserServiceWorker.mjs'

import { SplitPanels } from './splitPanels';

import { OpenEntities } from '../../models/openEntities/openEntities.mjs'
import { Panels } from '../../models/panels/panels.mjs'

import { InstallArtefactsExample } from '../../models/artefacts/artefacts.example.a.mjs';

export default {
  oninit: function(vnode) {
    Bsw.start()
  	OpenEntities.closeAllEntities()
  	InstallArtefactsExample()
  	InstallBswExamples()
  	Panels.reCreatePanels(5, 2)
  },
  view: function(vnode) {
  	return m(SplitPanels)
  }
}
