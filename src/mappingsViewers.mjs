/*

A mapping from a ComputePodMajorDomoUI entity type to a particular viewer
component which manages that entity type.

*/

import m from 'mithril'

import { Browser      } from './views/browser/browser.mjs';
import { FileEditors  } from './views/fileEditors/fileEditors.mjs';
import { LogViewers   } from './views/logViewers/logViewers.mjs';

export const MountPoint2Viewers = {
  "listFiles": (entityName) => m(Browser),
  "/projects": (entityName) => m(FileEditors, { entity: entityName }),
  "/logfile" : (entityName) => m(LogViewers, { entity: entityName }),
  "none"     : (entityName) => m('div'),
  "unknown"  : (entityName) => m('div', 'no known viewer for ['+entityName+']')
}
