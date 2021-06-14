/*

A mapping from a ComputePodMajorDomoUI entity type to a particular model
component which manages that entity type.

*/

import { BrowserModel  } from `models/browser/browser.mjs`
import { LogFiles      } from `models/logFiles/logFiles.mjs`
import { EditableFiles } from 'models/editableFiles/editableFiles.mjs'

export const MountPoint2Model = {
  "listFiles":    BrowserModel,
  "editableFile": EditableFiles,
  "logfiles":     LogFiles,
  "unknown":      BrowserModel
}
