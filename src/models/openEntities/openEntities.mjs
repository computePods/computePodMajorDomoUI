/*

The open entities model manages the collection of open entities known to
the MajorDomo client application.

The current state of each "open" entity will contain the following
information:

1. A `needsSaving` marker

2. The JSON object which represents the object.

*/

function createFakeTestOnlyModel(artefactPath, entityName, entityType, entityValue) {
	return {
	  artefactPath: artefactPath,
	  entityName: entityName,
		entityType: entityType,
		data: entityValue,
		getAllServerData: function() {	},
		getChangedServerData: function() {	}
	}
}

export const OpenEntities = {
  theEntities : {},
  compileMenu: function(initialMenu, openEntityCallback) {
    // each menu item *is* an object with `link` and `text` properties
    // (see ../views/utils.mjs :: createLinkFromItem)
    initialMenu.push({
    	link: false,
    	text: ""
    })
    for (let anEntityName in this.theEntities) {
    	initialMenu.push({
    		link: function() {
    			openEntityCallback(anEntityName)
    		},
    		text: anEntityName
    	})
    }
    return initialMenu
  },
  openEntity: function(artefactPath, entityName, entityModel) {
    var entityType = entityModel.entityType

    if (this.theEntities.hasOwnProperty(artefactPath)) {
      if (this.theEntities[artefactPath].entityType != entityType) {
      	console.log(
      	  "ERROR: openEntity: trying to overwrite existing entity ["+
      	  artefactPath+"] with a different type old:["+
      	  this.theEntities[artefactPath].entityType+"] new:["+
      	  entityType+"]"
      	)
      	return false
      }
    	if (this.theEntities[artefactPath].needsSaving) {
      	console.log(
      	  "ERROR: openEntity: trying to overwrite existing entity ["+
      	  artefactPath+"] which needs saving"
      	)
    	  return false
    	}
    }
    if (entityModel.hasOwnProperty('getAllServerData')) {
      entityModel.getAllServerData()
    }
  	this.theEntities[artefactPath] = {
  		needsSaving: false,
  		type: entityType,
  		name: entityName,
  		path: artefactPath,
  		model: entityModel
  	}
  	return true
  },
  openEntityWithTestData: function(anArtefactPath, anEntityName, anEntityType, anEntityValue) {
    return this.openEntity(
      anArtefactPath,
      anEntityName,
      createFakeTestOnlyModel(anArtefactPath, anEntityName, anEntityType, anEntityValue)
    )
  },
  updateEntity: function(anArtefactPath) {
  	if (this.theEntities.hasOwnProperty(anArtefactPath)) {
  		aModel = this.theEntities[anArtefactPath].model
  		if (aModel.hasOwnProperty('getChangedServerData')) {
  		  aModel.getChangedServerData()
  		}
  	}
  },
  getEntityType: function(anArtefactPath) {
    if (anArtefactPath == 'none') return 'none'

  	if (this.theEntities.hasOwnProperty(anArtefactPath)) {
  		return this.theEntities[anArtefactPath].type
  	}
  	return 'unknown'
  },
  getEntityName: function(anArtefactPath) {
    if (anArtefactPath == 'none') return 'none'

  	if (this.theEntities.hasOwnProperty(anArtefactPath)) {
  		return this.theEntities[anArtefactPath].name
  	}
  	return 'unknown'
  },
  getEntityModel: function(anArtefactPath) {
  	if (this.theEntities.hasOwnProperty(anArtefactPath)) {
  		return this.theEntities[anArtefactPath].model
  	}
  	return {}
  },
  getEntityValue: function(anArtefactPath) {
  	if (this.theEntities.hasOwnProperty(anArtefactPath)) {
  	  var thisEntity = this.theEntities[anArtefactPath]
  	  if (thisEntity.model.hasOwnProperty('data')) {
  		  return thisEntity.model.data
  	  }
  	}
  	return "no data"
  },
  markEntitySaved: function(anArtefactPath) {
  	if (this.theEntities.hasOwnProperty(anArtefactPath)) {
  		this.theEntities[anArtefactPath].needsSaving = false
  	}
  },
  markEntityNeedsSaving: function(anArtefactPath) {
  	if (this.theEntities.hasOwnProperty(anArtefactPath)) {
  		this.theEntities[anArtefactPath].needsSaving = true
  	}
  },
  closeEntity: function(anArtefactPath) {
    if (this.theEntities.hasOwnProperty(anArtefactPath)) {
    	if (this.theEntities[anArtefactPath].needsSaving) return false
    	delete this.theEntities[anArtefactPath]
    }
    return true
  },
  entitiesNeedingSaving: function() {
  	var needsSaving = []
  	for (let anEntity in this.theEntities) {
  		if (this.theEntities[anEntity].needsSaving) needsSaving.push(anEntity)
  	}
  	return needsSaving
  },
  closeAllEntities: function() {
    var needsSaving = this.entitiesNeedingSaving()
    var entityKeys = Object.keys(this.theEntities)
    for (let aKey of entityKeys) {
    	if (! needsSaving.includes(aKey)) {
    		delete this.theEntities[aKey]
    	}
    }
    if (0 < needsSaving.length) return false
  	return true
  }
}
