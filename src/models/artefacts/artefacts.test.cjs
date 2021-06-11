const test = require('ava')

/*

The Artefacts model manages the collection of known artefacts obtained
from one or other of the federation of MajorDomo backend servers.

This file contains the tests for the Artefacts model.

*/

test.before( async function(t) {
  var artefactsModule = await import('./artefacts.mjs')
  t.context.Artefacts = artefactsModule.Artefacts
})

test('Artefacts', async function(t) {
  var Artefacts = t.context.Artefacts

  t.assert(Artefacts.hasOwnProperty('theArtefacts'))
  t.assert(Artefacts.hasOwnProperty('splitPath'))
  t.assert(Artefacts.hasOwnProperty('findNode'))
  t.assert(Artefacts.hasOwnProperty('addNodeInfo'))
  t.assert(Artefacts.hasOwnProperty('getNodeInfo'))
  t.assert(Artefacts.hasOwnProperty('getNodeBranches'))
  t.assert(Artefacts.hasOwnProperty('isLeaf'))
  t.assert(Artefacts.hasOwnProperty('clearAllArtefacts'))
})


test('paths', async function(t) {
	var Artefacts = t.context.Artefacts
	t.deepEqual(Artefacts.splitPath(''), [])
	t.deepEqual(Artefacts.splitPath('/'), [])
	t.deepEqual(Artefacts.splitPath('//'), [])
	t.deepEqual(Artefacts.splitPath('/silly/'), ['silly'])
})


var branchData = {
	paths: [],
	nodes: [],
	branches: []
}

function branchFunction(aPath, aNode, branches) {
  var pathStr = '<'+aPath.join('-')+'>'
  branchData.paths.push(pathStr)
  branchData.nodes.push(aNode)
  branchData.branches.push(branches)
  return pathStr
}

var leafData = {
	paths: [],
	nodes: []
}

function leafFunction(aPath, aNode) {
  var pathStr = '{'+aPath.join('-')+'}'
  leafData.paths.push(pathStr)
  leafData.nodes.push(aNode)
  return pathStr
}

test('theArtefacts', async function(t) {
	var Artefacts = t.context.Artefacts

	t.deepEqual(Artefacts.theArtefacts, {})

	Artefacts.addNodeInfo("", {
		someInfo: "some Info"
	})
	t.deepEqual(Artefacts.theArtefacts, { someInfo: "some Info"})

  Artefacts.addNodeInfo('silly', {
  	someMoreInfo: "some More Info"
  })

	t.deepEqual(Artefacts.theArtefacts, {
	  someInfo: "some Info",
	  branches: {
	    silly: { someMoreInfo: 'some More Info' }
	  }
	})

  t.deepEqual(Artefacts.getNodeInfo(''), {
  	  someInfo: "some Info",
  	  branches: {
  	    silly: { someMoreInfo: 'some More Info' }
  	  }
  	})

  t.deepEqual(Artefacts.getNodeInfo('silly'), { someMoreInfo: 'some More Info' })

  t.deepEqual(Artefacts.getNodeBranches(''), [ 'silly' ])
  t.deepEqual(Artefacts.getNodeBranches('silly'), [ ])

  t.false(Artefacts.isLeaf(''))
  t.true(Artefacts.isLeaf('silly'))

  t.is(Artefacts.walkOverArtefacts(branchFunction, leafFunction), '<>')
  t.deepEqual(branchData, {
     branches: [ [ '{silly}' ] ],
     nodes: [ {
         branches: { silly: { someMoreInfo: 'some More Info' } },
         someInfo: 'some Info',
       },
     ],
     paths: [ '<>' ]
  })
  t.deepEqual(leafData, {
     nodes: [ { someMoreInfo: 'some More Info'  } ],
     paths: [ '{silly}' ]
  })

  Artefacts.clearAllArtefacts()

  t.deepEqual(Artefacts.theArtefacts, {})
})
