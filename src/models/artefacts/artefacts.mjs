/*

The artefacts model manages the collection of currently known artefacts
obtained from one or other of the federation MajorDomo backend servers.

The artefact model is a hierarchy of object (dictionaries) one object at
each level of the hierarchy.

As the user expands the hierarchy addition detail may be added at what is
currently a leaf node of the hierarchy.

This hierarchical structure is consumed by the [browser
panel](../views/browser).

By definition, a leaf node has no branches.

*/

function recurseOverArtefacts(aPath, someArtefacts, branchFunction, leafFunction) {
	var branches = []
	if (someArtefacts.hasOwnProperty('branches')) {
	  for (let aBranchName in someArtefacts.branches) {
		  aPath.push(aBranchName),
		  branches.push(
		    recurseOverArtefacts(
		      aPath.slice(),
		      someArtefacts.branches[aBranchName],
		      branchFunction,
		      leafFunction
		    )
		  )
		  aPath.pop()
	  }
	}
	if (0 < branches.length) {
		return branchFunction(aPath, someArtefacts, branches)
	}
	return leafFunction(aPath, someArtefacts)
}

function removeArtefact(pathParts, someArtefacts) {
  if (pathParts.length < 1) { return true }
  var aPathPart = pathParts.shift()
  if (!aPathPart) { return true }

	if (!someArtefacts.hasOwnProperty('branches')) { return true }

  if (someArtefacts['branches'].length < 1) { return true }

	if (!someArtefacts['branches'].hasOwnProperty(aPathPart)) { return false }

  if (removeArtefact(pathParts, someArtefacts['branches'][aPathPart])) {
    delete someArtefacts['branches'][aPathPart]
  }

  if (Object.keys(someArtefacts['branches']).length < 1) {
    delete someArtefacts['branches']
    return true
  }

  return false
}

export const Artefacts = {
  theArtefacts : {},
  splitPath: function(aPath) {
  	return aPath.split('/').filter(aPart => aPart != '')
  },
  addNodeInfo: function(aPath, nodeInfo) {
  	let curNode = this.theArtefacts
  	var pathParts = this.splitPath(aPath)

  	for (let aPart of pathParts) {
  		if (!curNode.hasOwnProperty('branches')) curNode['branches'] = {}

  		if (!curNode['branches'].hasOwnProperty(aPart)) {
  		  curNode['branches'][aPart] = {}
   		}

  		curNode = curNode['branches'][aPart]
  	}
  	for (let aKey in nodeInfo) {
  	  if (aKey != 'branches')	curNode[aKey] = nodeInfo[aKey]
  	}
  },
  findNode: function(aPath) {
  	var curNode = this.theArtefacts
  	var pathParts = this.splitPath(aPath)
  	for (let aPart of pathParts) {
  		if (!curNode.hasOwnProperty('branches')) { return null }

  		if (!curNode['branches'].hasOwnProperty(aPart)) { return null }

  		curNode = curNode['branches'][aPart]
  	}
  	return curNode
  },
  removeNode: function(aPath) {
  	var curNode = this.theArtefacts
  	var pathParts = this.splitPath(aPath)
    if (removeArtefact(pathParts, curNode)) {
      this.theArtefacts = {}
    }
  },
  getNodeInfo: function(aPath) {
  	return this.findNode(aPath)
  },
  getNodeBranches: function(aPath) {
  	var aNode = this.findNode(aPath)
  	if (!aNode) { return [] }
  	if (!aNode.hasOwnProperty('branches')) { return [] }
  	return Object.keys(aNode['branches'])
  },
  isLeaf: function(aPath) {
    var aNode = this.findNode(aPath)
  	if (!aNode) return false
  	if (aNode.hasOwnProperty('branches')) { return false }
  	return true
  },
  walkOverArtefacts: function(branchFunction, leafFunction) {
		return recurseOverArtefacts(
		  [],
		  this.theArtefacts,
		  branchFunction,
		  leafFunction
		)
  },
  clearAllArtefacts : function() {
  	this.theArtefacts = {}
  }
}
