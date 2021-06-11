import m from 'mithril';

import { Browser                 } from './browser';
import { InstallArtefactsExample } from '../../models/artefacts/artefacts.example.a.mjs';


export default {
  oninit: function(vnode) { InstallArtefactsExample() },
	view: function(vnode) {
		return m(Browser)
	}
}
