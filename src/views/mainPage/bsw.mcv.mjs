import m from 'mithril';

import { Bsw } from '../../../mcv/mocks/browserServiceWorker.mjs'

import { MainPage } from './mainPage';

import { OpenEntities } from '../../models/openEntities/openEntities.mjs'
import { Panels } from '../../models/panels/panels.mjs'

import { InstallFileEditorExample } from '../../models/openEntities/openEntities.example.fileEditor.mjs'
import { InstallLogViewerExample } from '../../models/openEntities/openEntities.example.logViewer.mjs'

import { InstallArtefactsExample } from '../../models/artefacts/artefacts.example.a.mjs';

export default {
  oninit: function(vnode) {
    Bsw.start()
  	OpenEntities.closeAllEntities()
  	InstallFileEditorExample()
  	InstallLogViewerExample()
  	InstallArtefactsExample()
   	Panels.reCreatePanels(5, 2)
  },
  view: function(vnode) {
  	return m(MainPage)
  }
}

