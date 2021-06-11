import m from 'mithril';
import Prism from 'eStatic/prism';
//import hljs from 'eStatic/highlightjs/highlight.pack';

import { OpenEntities } from '../../models/openEntities/openEntities.mjs'

export const LogViewers = () => {
  return {
    view: (vnode) => {
//      console.log(Prism.languages)
//      console.log(vnode.children)
      var entityName = vnode.attrs.entity
      var origHtml = entityName+' is not viewable with a Log Viewer'
      if (OpenEntities.getEntityType(entityName) == 'logViewer') {
        origHtml = OpenEntities.getEntityValue(entityName)
      }
      var prismHtml = Prism.highlight(
        origHtml,
        Prism.languages.log,
        'log'
      )
//      var html = hljs.highlight(origHtml, {language: 'accesslog' }).value
//      console.log("-------------------------------------")
//      console.log(origHtml)
      var lines = prismHtml.trim().split(/\r\n|\n\r|\n|\r/);
      var lineEven = false;
      var lineClass = [ 'log-even', 'log-odd' ];
      var html = lines.map(aLine => {
      	lineEven = (lineEven + 1) % 2;
        return '<span class="'+lineClass[lineEven]+'">'+aLine+'</span>'
      }).join("\n")
//      console.log("-------------------------------------")
//      console.log(html)
//      console.log("-------------------------------------")
      return m('pre',
        { class: 'log-viewer' },
        m('code',
          { class: 'log-viewer-code'},
          m.trust(html)
        )
      )
    }
  }
}
