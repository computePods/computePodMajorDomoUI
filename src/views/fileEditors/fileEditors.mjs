import m from 'mithril';
import Prism from 'eStatic/prism';
import { CodeJar } from 'codeJar';

import { OpenEntities } from '../../models/openEntities/openEntities.mjs'

export const FileEditors = {
  oncreate: function(vnode) {
    var editorNode = document.querySelector('#file-editor');
    var cJarOptions = {
      tab: ' '.repeat(2), // default is '\t'
      indentOn: /[(\[]$/, // default is /{$/
      spellcheck: false,
    };
    var cJar = CodeJar(editorNode, Prism.highlightElement, cJarOptions);
  },
  view: function(vnode) {
    var entityName = vnode.attrs.entity
    return m('div',
      {
        class: 'file-editor language-python',
        id: 'file-editor',
      },
      ( OpenEntities.getEntityType(entityName) == 'editableFile' ?
        OpenEntities.getEntityValue(entityName) :
        entityName+' is not viewable with a File Editor'
      )
    )
  }
}
