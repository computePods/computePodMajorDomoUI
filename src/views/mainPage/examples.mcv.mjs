import m from 'mithril';

import { InstallMithrilExamples } from '../../../mcv/mithrilExamples.mjs'

import { MainPage } from './mainPage';

import { OpenEntities } from '../../models/openEntities/openEntities.mjs'
import { Panels } from '../../models/panels/panels.mjs'

import { InstallArtefactsExample } from '../../models/artefacts/artefacts.example.a.mjs';

export default {
  oninit: function(vnode) {
  	OpenEntities.closeAllEntities()
  	InstallArtefactsExample()
  	InstallMithrilExamples()
   	Panels.reCreatePanels(5, 2)
  },
  view: function(vnode) {
  	return m(MainPage)
  }
}

