import m from 'mithril';

import { InstallBswExamples, Bsw } from '../../../mcv/browserServiceWorker.mjs'

import { FileEditors } from './fileEditors';
import { OpenEntities } from '../../models/openEntities/openEntities.mjs'

export default {
  oninit: function(vnode) {
    Bsw.stop()
    OpenEntities.closeAllEntities()
    InstallBswExamples()
  },
  view: function(vnode) {
    return m(FileEditors, { entity: "Project definition for the 'Measuring Heyting algebras' paper" })
  }
}
