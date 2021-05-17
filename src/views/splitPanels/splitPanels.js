import m from 'mithril';
import Split from 'split.js';

export const SplitPanels = () => {

  function splitPanels(vnode) {
    var thePanels = [];
    
    vnode.dom.childNodes.forEach( anItem => {
    
      if (anItem.classList.contains('split-panel')) {
        thePanels.push('#'+anItem.id)
      }
      
    });
    Split(thePanels);
  }
  
  return {
    oncreate: splitPanels,
    onupdate: splitPanels,
    view: () =>
      m(
        'div',
        { class: 'split split-panels' },
        m('div', {
          id: 'split-1',
          class: 'content has-text-centered split-panel'
        }, "This is split-1"),
        m('div', {
          id: 'split-2',
          class: 'content has-text-centered split-panel'
        }, "This is split-2"),
        m('div', {
          id: 'split-3',
          class: 'content has-text-centered split-panel'
        }, "This is split-3"),
      ),
  };
};
