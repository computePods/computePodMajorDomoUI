/*

The Panels model manages the "Panels" used by the SplitPanels View.

To keep things simple, we create a collection of panels and then hide
those which are not being used. Given current browser sizes, a collection
of 4-5 panels should be more than sufficient.

We "hide" a panel in two ways:

 1. Hidden panels are not listed in the `split()` method.

 2. Hidden panels are given the hidden attribute.

Each un-hidden panel contains a reference to its associated open entity.

*/

export const Panels = {
  thePanels : [],
  reCreatePanels: function(maxNumSplits, numOpenSplits) {
    this.thePanels = []
    for (let i = 0; i < maxNumSplits; i++) {
    	this.thePanels[i] = {
    		hidden: (i < numOpenSplits ? false : true),
    		id: 'split-'+(i+1).toString(),
    		num: i,
    		entityName: "none"
    	}
    }
  },
  beingViewed: function(anEntityName) {
  	for (let aPanel of this.thePanels) {
  		if (aPanel.theEntity == anEntityName) return true
  	}
  	return false
  },
  setPanelEntityName: function(panelNum, anEntityName) {
  	if ((panelNum < 1) || (this.maxNumSplits < panelNum)) return
  	this.thePanels[panelNum].entityName = anEntityName
  },
  getPanelEntityName: function(panelNum) {
  	if ((panelNum < 1) || (this.maxNumSplits < panelNum)) {
  	  console.log('panel ['+panelNum+'] is out of bounds!')
  	  return 'none'
  	}
  	var entityName = this.thePanels[panelNum].entityName
    console.log('panel '+panelNum.toString()+' is ['+entityName+']')
  	return entityName
  },
  openAPanel: function() {
    // find the first hidden panel
    for (let aPanel of this.thePanels) {
    	if (aPanel.hidden) {
    		aPanel.hidden = false
    		return
    	}
    }
  },
  closePanel: function(aPanelNum) {
  	if (this.thePanels.length <= aPanelNum) return
  	if (aPanelNum < 0) return
  	let numOpenPanels = 0
  	for (let aPanel of this.thePanels) {
  		if (! aPanel.hidden) numOpenPanels += 1
  	}
  	if (numOpenPanels < 2) return
  	this.thePanels[aPanelNum].hidden = true
  	this.thePanels[aPanelNum].entityName = "none"
  }
}
