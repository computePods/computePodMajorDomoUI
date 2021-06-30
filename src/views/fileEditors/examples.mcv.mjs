import m from 'mithril';

import { InstallMithrilExamples } from '../../../mcv/mithrilExamples.mjs'

import { FileEditors } from './fileEditors';
import { OpenEntities } from '../../models/openEntities/openEntities.mjs'

export default {
  oninit: function(vnode) {
    OpenEntities.closeAllEntities()
    InstallMithrilExamples()
  },
  view: function(vnode) {
    return m(FileEditors, { entity: "Project definition for the 'Measuring Heyting algebras' paper" })
  }
}
