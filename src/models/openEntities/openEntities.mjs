/*

The open entities model manages the collection of open entities known to
the MajorDomo client application.

The current state of each "open" entity will contain the following
information:

1. A `needsSaving` marker

2. The JSON object which represents the object.

*/

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
  openEntity: function(anEntityName, anEntityType, anEntityValue) {
    if (this.theEntities.hasOwnProperty(anEntityName)) {
    	if (this.theEntities[anEntityName].needsSaving)	return false
    }
  	this.theEntities[anEntityName] = {
  		needsSaving: false,
  		type: anEntityType,
  		value: anEntityValue
  	}
  	return true
  },
  getEntityType: function(anEntityName) {
  	if (this.theEntities.hasOwnProperty(anEntityName)) {
  		return this.theEntities[anEntityName].type
  	}
  	return 'unknown'
  },
  getEntityValue: function(anEntityName) {
  	if (this.theEntities.hasOwnProperty(anEntityName)) {
  		return this.theEntities[anEntityName].value
  	}
  	return ''
  },
  markEntitySaved: function(anEntityName) {
  	if (this.theEntities.hasOwnProperty(anEntityName)) {
  		this.theEntities[anEntityName].needsSaving = false
  	}
  },
  markEntityNeedsSaving: function(anEntityName) {
  	if (this.theEntities.hasOwnProperty(anEntityName)) {
  		this.theEntities[anEntityName].needsSaving = true
  	}
  },
  closeEntity: function(anEntityName) {
    if (this.theEntities.hasOwnProperty(anEntityName)) {
    	if (this.theEntities[anEntityName].needsSaving) return false
    	delete this.theEntities[anEntityName]
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
