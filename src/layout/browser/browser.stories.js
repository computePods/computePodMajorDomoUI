import m from 'mithril';

import { Browser } from './browser';
import { BrowserData } from './browserData';

export default {
  title: 'Layout/Browser',
  component: Browser,
}

const Template = ({ children, ...args }) => ({
  view: () => {
    return m(Browser, args, children)
  },
});

export const Primary = Template.bind({});
Primary.args = {
  model: BrowserData(),
};