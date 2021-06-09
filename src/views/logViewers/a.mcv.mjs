import m from 'mithril';

import { LogViewers } from './logViewers';
import { LogViewersData } from './logViewersData';

export default {
  view: function(vnode) {
  	return m(LogViewers, {
  		model: LogViewersData()
  	})
  }
}
