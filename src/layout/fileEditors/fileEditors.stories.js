import m from 'mithril';

import { FileEditors } from './fileEditors';
import { FileEditorsData } from './fileEditorsData';

export default {
  title: 'Layout/FileEditors',
  component: FileEditors,
}

const Template = ({ children, ...args }) => ({
  view: () => {
    return m(FileEditors, args, children)
  },
});

export const Primary = Template.bind({});
Primary.args = {
  children: [ FileEditorsData() ],
  //children: [ 'var data = 1;' ],
};
