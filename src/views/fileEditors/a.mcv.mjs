import m from 'mithril';

import { FileEditors } from './fileEditors';
import { FileEditorsData } from './fileEditorsData.mjs';

export default {
  view: function(vnode) {
    return m(FileEditors, { model: FileEditorsData() })
  }
}
