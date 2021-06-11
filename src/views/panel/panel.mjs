import m from 'mithril';

import { Header } from '../header/header.mjs'
import { createLinkFromItem } from '../utils.mjs'

import { Browser      } from '../browser/browser.mjs';
import { FileEditors  } from '../fileEditors/fileEditors.mjs';
import { LogViewers   } from '../logViewers/logViewers.mjs';
import { OpenEntities } from '../../models/openEntities/openEntities.mjs'

export const Panel = (origVNode) => {
  let theLink = origVNode.attrs.theLink || {}
  let theContents = m('div')
  function openArtefactBrowser() {
  	theContents = m(Browser)
  }
  function clearPanel() {
  	theContents = m('div')
  }
  var initialMenu = [
  	{ link: clearPanel,          text: 'Clear'   },
  	{ link: false,               text: ''        },
  	{ link: openArtefactBrowser, text: 'Browser' }
  ]
  let theMenu = OpenEntities.compileMenu(initialMenu, function(entityName) {
    console.log(entityName)
    switch(OpenEntities.getEntityType(entityName)) {
      case 'logViewer' :
        theContents = m(LogViewers, { entity: entityName })
        break;
      case 'fileEditor' :
        theContents = m(FileEditors, { entity: entityName })
        break;
      case 'artefact-browser':
        break;
      default:
        theContents = m('div')
    }
  })
  return {
    view: () =>
      m(
        'div',
        { class: 'panel' },
        m(Header, {
          theMenu: theMenu
        }),
        m(
          'div',
          theContents
        ),
      ),
  };
};
