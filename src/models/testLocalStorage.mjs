/*

We implement a simple mock up of a browser's local storage.

*/

export const localStorage = {
	theStore: {},
	getItem: function(aKey) {
		if (!this.theStore.hasOwnProperty(aKey)) this.theStore[aKey] = ''
		return this.theStore[aKey]
	},
	setItem: function(aKey, aValue) {
		this.theStore[aKey] = aValue
	}
}
