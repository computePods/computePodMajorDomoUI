import m from 'mithril';
//import Prism from '@prismjs/prism';
import Prism from '@eStatic/prism';
import { CodeJar } from '@codeJar/codejar';

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
      var fileStr = vnode.children[0]
      console.log("-------------------------------------")
      console.log(fileStr)
      console.log("-------------------------------------")
      return m('div',
        {
          class: 'file-editor language-python', 
          id: 'file-editor',
        },
        fileStr
      )
    }
  }
}