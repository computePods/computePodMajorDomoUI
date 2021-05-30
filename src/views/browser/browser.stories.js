import m from 'mithril';

import { Browser } from './browser';
import { BrowserData } from './browserData';

export default {
  title: 'Components/Browser',
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
