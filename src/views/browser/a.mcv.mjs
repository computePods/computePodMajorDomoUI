import m from 'mithril';

import { Browser     } from './browser';
import { BrowserData } from './browserData';

export default {
	view: function(vnode) {
		return m(Browser, { model: BrowserData() })
	}
}
