import m from 'mithril';
import Prism from 'eStatic/prism';
import { CodeJar } from 'codeJar';

import { stringify } from 'yaml'

import { OpenEntities } from '../../models/openEntities/openEntities.mjs'

const editableFileMountPoints = [
	'/projects'
]

const convertToText = {
	'/projects' : function(jsonValue) {	return stringify(jsonValue)	},
}

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
    var entityType = OpenEntities.getEntityType(entityName)
    var theText = '['+entityName+'] is not viewable with a File Editor'
    if (editableFileMountPoints.includes(entityType)) {
        theText = convertToText[entityType](OpenEntities.getEntityValue(entityName))
    }
    return m('div',
      {
        class: 'file-editor language-python',
        id: 'file-editor',
      },
      theText
    )
  }
}
