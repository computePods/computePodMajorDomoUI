import m from 'mithril';
import Split from 'split.js';

export const SplitPanels = (origVNode) => {

  function splitPanels(vnode) {

    var thePanels = [];
    
    vnode.dom.childNodes.forEach( anItem => {
    
      if (anItem.classList.contains('split-panel')) {
        thePanels.push('#'+anItem.id)
      }
      
    });

    var sizes = localStorage.getItem('split-sizes')
    if (sizes) {
      sizes = JSON.parse(sizes)
    } else {
      sizes = [50, 50] // default sizes
    }
    if (sizes.length != thePanels.length) {
      sizes = []
      var sizesLength = thePanels.length
      for (var i = 0; i < sizesLength; i++) {
        sizes[i] = 100/sizesLength
      }
    }

    var split = Split(thePanels, {
      sizes: sizes,
      onDragEnd: function (sizes) {
        localStorage.setItem('split-sizes', JSON.stringify(sizes))
      },
    })
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
