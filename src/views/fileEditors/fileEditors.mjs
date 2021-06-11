import m from 'mithril';
import Prism from 'eStatic/prism';
import { CodeJar } from 'codeJar';

import { OpenEntities } from '../../models/openEntities/openEntities.mjs'

export const FileEditors = () => {
  var cJar;
  var cJarOptions;
  var editorNode;
  return {
    oncreate: (vnode) => {
      editorNode = document.querySelector('#file-editor');
      cJarOptions = {
        tab: ' '.repeat(2), // default is '\t'
        indentOn: /[(\[]$/, // default is /{$/
        spellcheck: false,
      };
      console.log(CodeJar)
      cJar = CodeJar(editorNode, Prism.highlightElement, cJarOptions);
    },
    view: (vnode) => {
      var entityName = vnode.attrs.entity
      return m('div',
        {
          class: 'file-editor language-python',
          id: 'file-editor',
        },
        ( OpenEntities.getEntityType(entityName) == 'fileEditor' ?
          OpenEntities.getEntityValue(entityName) :
          entityName+' is not viewable with a File Editor'
        )
      )
    }
  }
}
