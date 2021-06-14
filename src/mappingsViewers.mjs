/*

A mapping from a ComputePodMajorDomoUI entity type to a particular viewer
component which manages that entity type.

*/

import m from 'mithril'

import { Browser      } from './views/browser/browser.mjs';
import { FileEditors  } from './views/fileEditors/fileEditors.mjs';
import { LogViewers   } from './views/logViewers/logViewers.mjs';

export const MountPoint2Viewers = {
  "listFiles":    (entityName) => m(Browser),
  "editableFile": (entityName) => m(FileEditors, { entity: entityName }),
  "logfiles":     (entityName) => m(LogViewers, { entity: entityName }),
  "unknown":      (entityName) => m('div')
}
