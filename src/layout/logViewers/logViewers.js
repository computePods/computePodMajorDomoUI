import m from 'mithril';
import Prism from '@prismjs/prism';

export const LogViewers = () => {
  return {
    view: (vnode) => { 
      return m('pre',
        { class: 'log-viewer' },
        m.trust(
          Prism.highlight(vnode.children, Prism.languages.javascript, 'javascript')
        )
      )
    }
  }
}