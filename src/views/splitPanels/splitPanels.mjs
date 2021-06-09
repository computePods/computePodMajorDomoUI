import m from 'mithril';
import Split from 'split.js';

export const SplitPanels = function(origVNode) {
  let maxNumSplits = origVNode.attrs.maxNumSplits || 5
  console.log(maxNumSplits)
  let numOpenSplits = origVNode.attrs.numOpenSplits || 2
  numOpenSplits = (numOpenSplits <= maxNumSplits) ? numOpenSplits : maxNumSplits
  console.log(numOpenSplits)
  let thePanels = [];
  let thePanelIDs = [];
  for (var i = 0; i < maxNumSplits; i++) {
    thePanelIDs[i] = 'split-'+(i+1).toString()
    thePanels[i] = m(
      'div',
      { 
        class: 'content has-text-centered split-panel',
        id: thePanelIDs[i]
      },
      'This is split-'+(i+1).toString()
    )
    thePanelIDs[i] = '#'+thePanelIDs[i]
  }

  function splitPanels(vnode) {
    
    var sizes = localStorage.getItem('split-sizes')
    if (sizes) {
      sizes = JSON.parse(sizes)
    } else {
      sizes = [50, 50] // default sizes
    }
    var sizesLength = thePanels.length
    if (sizes.length != sizesLength) {
      sizes = []
      for (var i = 0; i < numOpenSplits; i++) {
        sizes[i] = 100/numOpenSplits
      }
      for (var i = numOpenSplits; i < sizesLength; i++) {
      	sizes[i] = 0
      }
    }
    var minSizes = []
    for (var i = 0; i < sizesLength; i++) minSizes[i] = 0

    var split = Split(thePanelIDs, {
      sizes: sizes,
      minSizes: minSizes,
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
        thePanels
      ),
  };
};
