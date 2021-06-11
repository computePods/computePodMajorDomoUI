import m from 'mithril';

import { FileEditors } from './fileEditors';
import { OpenEntities } from '../../models/openEntities/openEntities.mjs'
import { InstallFileEditorExample } from '../../models/openEntities/openEntities.example.fileEditor.mjs'

export default {
  oninit: function(vnode) {
  	OpenEntities.closeAllEntities()
  	InstallFileEditorExample()
  },
  view: function(vnode) {
    return m(FileEditors, { entity: 'fileEditorExample' })
  }
}
