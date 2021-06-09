import m from 'mithril';

import { MainPage } from './mainPage';
import { MainPageData } from './mainPageData';

export default {
  view: function(vnode) {
  	return m(MainPage, {
      model: MainPageData(),
  	})
  }
}
