/*

The Panels model manages the "Panels" used by the SplitPanels View.

To keep things simple, we create a collection of panels and then hide
those which are not being used. Given current browser sizes, a collection
of 4-5 panels should be more than sufficient.

We "hide" a panel in two ways:

 1. Hidden panels are not listed in the `split()` method.

 2. Hidden panels are given the hidden attribute.

 3. The size of hidden panels is set to zero.

Each un-hidden panel contains the name of its associated open entity.

*/

import log from 'loglevel'

import Split from 'split.js';

const minPanelSize = 10

export const Panels = {
  thePanels : [],
  theSplitter : null,
  openPanelIDs : [],
  openPanelSizes : [],
  openPanelMinSizes : [],
  reCreatePanels: function(maxNumPanels, numOpenPanels) {

    // (re) create the panels model. This should be used ONCE in any
    // application.

    // ensure we have at least one open panel at all times

    if (numOpenPanels < 1) numOpenPanels = 1

    // We begin by loading any saved panel-sizes from local storage.

    var origSizes = localStorage.getItem('panel-sizes')
    if (origSizes) {
      origSizes = JSON.parse(origSizes)
    } else {
      origSizes = []
    }
    if (origSizes.length < 1) {
      for (var i = 0 ; i < numOpenPanels; i++ ) {
        origSizes[i] = 100/numOpenPanels // default sizes
      }
    }

    // normalise the sizes and then compute how to resize the original
    // panels.

    var origSizesLength = origSizes.length
    if (origSizesLength < numOpenPanels) {
      var minOrigSize = 100000
    	for (var i = 0; i < origSizesLength; i++) {
    	if (origSize[i] < minPanelSize) origSize[i] = minPanelSize
    		if (origSizes[i] < minOrigSize) minOrigSize = origSizes[i]
    	}
  	  for (var i = origSizes.length ; i < numOpenPanels ; i++) {
        origSizes.push(minOrigSize)
      }
    } else if (numOpenPanels < origSizesLength) {
    	for (var i = 0; i < numOpenPanels; i++) {
      	if (origSizes[i] < minPanelSize) origSizes[i] = minPanelSize
      }
    	for (var i = numOpenPanels; i < origSizesLength; i++) origSizes.pop()
    }

    // origSizes.length and numOpenPanels should now be equal

    var sumOrigSizes = origSizes.reduce((sum, aValue) => sum + aValue)
    if (sumOrigSizes < 1.0) sumOrigSizes = 1.0
  	var expansionFactor = 100/sumOrigSizes

    // Now we create the panels with the normalised / computed sizes.

    this.thePanels = []
    var sizes = []
    for (let i = 0; i < maxNumPanels; i++) {
    	this.thePanels[i] = {
    		hidden: (i < numOpenPanels ? false : true),
    		size: (i < numOpenPanels ? origSizes[i]*expansionFactor : 0),
    		id: 'split-'+(i+1).toString(),
    		num: i,
    		entityName: "none"
    	}
    	sizes.push(this.thePanels[i].size)
    }
  	localStorage.setItem('panel-sizes', JSON.stringify(sizes))
  },
  recomputePanelSizes: function(oldNumOpenPanels, newNumOpenPanels) {

    // recompute panel sizes is used when ever we change the number of
    // open panels.

    var expansionFactor = oldNumOpenPanels/newNumOpenPanels
    for (let aPanel of this.thePanels) {
    	if (aPanel.hidden) aPanel.size = 0
    	else if (aPanel.size == 0) aPanel.size = 100 / newNumOpenPanels
    	else aPanel.size = aPanel.size = aPanel.size * expansionFactor
    }
  },
  updateSizes: function(sizes) {

    // The panel sizes are updated by the SplitJS on drag callback to
    // ensure this model has the current panel sizes

  	localStorage.setItem('panel-sizes', JSON.stringify(sizes))
  	var i = 0
  	for (var aPanel of Panels.thePanels) {
  		if (!aPanel.hidden) {
  			aPanel.size = sizes[i]
  			if (i < sizes.length) i++
  		}
  	}
  },
  beingViewed: function(anEntityName) {

    // could be used by setPanelEntityName to ensure only one panel is
    // viewing/editing a entity at one time.

  	for (let aPanel of this.thePanels) {
  		if (aPanel.theEntity == anEntityName) return true
  	}
  	return false
  },
  setPanelEntityName: function(panelNum, anEntityName) {

    // This is used by a panel's menu callback to set the entity for the
    // panel.

  	if ((panelNum < 0) || (this.maxNumSplits < panelNum)) return
  	this.thePanels[panelNum].entityName = anEntityName
  },
  getPanelEntityName: function(panelNum) {

    // This is used by the panel's view function to select which entity it
    // should be viewing.

  	if ((panelNum < 0) || (this.maxNumSplits < panelNum)) {
  	  log.error('panel ['+panelNum+'] is out of bounds!')
  	  return 'none'
  	}
  	return this.thePanels[panelNum].entityName
  },
  reCreateSplitter: function() {

    // (re) create the splitter whenever the number of panels changes. We
    // use a lazy update/creation style.
  	this.openPanelIDs = []
  	this.openPanelSizes = []
  	this.openPanelMinSizes = []
  	for (let aPanel of this.thePanels) {
  		if (!aPanel.hidden) {
    		this.openPanelIDs.push('#'+aPanel.id)
  			this.openPanelSizes.push(aPanel.size)
  			this.openPanelMinSizes.push(minPanelSize)
  		}
  	}
  	if ((this.theSplitter != null) &&
  	    (this.theSplitter.hasOwnProperty('destroy')))
      this.theSplitter.destroy()
  	this.theSplitter = null
    try {
      this.theSplitter = Split(this.openPanelIDs, {
        sizes:     this.openPanelSizes,
        minSizes:  this.openPanelMinSizes,
        onDragEnd: this.updateSizes
      })
    } catch (err) {
    	// do nothing but catch all errors
    	log.error(err)
    }
  },
  getNumOpenPanels: function() {
    var numOpenPanels = 0
    for (let aPanel of this.thePanels) if (!aPanel.hidden) numOpenPanels++
    return numOpenPanels
  },
  openAPanel: function() {

    // Open the first hidden panel. This is used by the main page menu
    // callback.
    var foundHiddenPanel = false
    for (let aPanel of Panels.thePanels) {
    	if (aPanel.hidden) {
    		aPanel.hidden = false
    		foundHiddenPanel = true
    		break
    	}
    }
    if (!foundHiddenPanel) return

    var newNumOpenPanels = Panels.getNumOpenPanels()
    Panels.recomputePanelSizes(newNumOpenPanels - 1, newNumOpenPanels)
    Panels.reCreateSplitter()
  },
  closePanel: function(aPanelNum) {

    // Close the specified panel. This is used by the panel's menu
    // callback.

  	if (this.thePanels.length <= aPanelNum) return
  	if (aPanelNum < 0) return
  	let oldNumOpenPanels = this.getNumOpenPanels()
  	if (oldNumOpenPanels < 2) return
  	this.thePanels[aPanelNum].hidden = true
  	this.thePanels[aPanelNum].entityName = "none"
  	this.thePanels[aPanelNum].size = 0
    this.recomputePanelSizes(oldNumOpenPanels, oldNumOpenPanels - 1)
    this.reCreateSplitter()
  }
}
