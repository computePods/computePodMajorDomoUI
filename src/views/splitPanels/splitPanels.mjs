import m from 'mithril';

import { Panel } from '../panel/panel.mjs'
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
    thePanels[i] = m(Panel, { panelID: thePanelIDs[i], panelNum: i })
    thePanelIDs[i] = '#'+thePanelIDs[i]
  }

  function splitPanels(vnode) {

    // reload the current split-sizes from local storage
    //
    var origSizes = localStorage.getItem('split-sizes')
    if (origSizes) {
      origSizes = JSON.parse(origSizes)
    } else {
      origSizes = []
    }
    if (origSizes.length < 1) {
      for (var i = 0 ; i < numOpenSplits; i++ ) {
        origSizes[i] = 100/numOpenSplits // default sizes
      }
    }

    // compute how to resize the original splits
    //
    var expansionFactor = 1.0
    var sumOrigSizes = origSizes.reduce((sum, aValue) => sum + aValue)
    if (sumOrigSizes < 1.0) sumOrigSizes = 1.0
    if (origSizes.length != numOpenSplits) {
      expansionFactor = numOpenSplits/origSizes.length
    } else if (sumOrigSizes < 99) {
    	expansionFactor = 100/sumOrigSizes
    }

    // Now we resize the splits and ensure we only view the open splits
    //
    var sizes        = []
    var minSizes     = []
    var openPanelIDs = []
    for (var i = 0; i < numOpenSplits; i++) {
      sizes[i]        = origSizes[i] * expansionFactor
    	minSizes[i]     = 0
    	openPanelIDs[i] = thePanelIDs[i]
    }

    // Hide the unopened splits
    //
    for (var i = numOpenSplits; i < maxNumSplits; i++ ) {
    	thePanels[i].dom.hidden = true
    }

    // console.log(origSizes)
    // console.log(sizes)
    // console.log(minSizes)
    // console.log(openPanelIDs)

    var split = Split(openPanelIDs, {
      sizes:     sizes,
      minSizes:  minSizes,
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
