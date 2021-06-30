/*

  This component manages the browser side of the mockServer examples for
  the mithril component viewer.

*/

import { All_examples } from '../src/interfaces/AllMithrilExamples.mjs'

import { OpenEntities } from '../src/models/openEntities/openEntities.mjs'

export function InstallMithrilExamples() {
	for (var anExample in All_examples) {
		OpenEntities.openEntity(anExample, anExample, All_examples[anExample]())
	}
}
