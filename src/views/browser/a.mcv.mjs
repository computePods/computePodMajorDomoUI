import m from 'mithril';

import { Browser                 } from './browser';
import { InstallArtefactsExample } from '../../models/artefacts/artefacts.example.a.mjs';
import { Notifications } from '../../models/notifications/notifications.mjs'

export default {
  oninit: function(vnode) {
    InstallArtefactsExample()
    Notifications.start()
  },
	view: function(vnode) {
		return m(Browser)
	}
}
