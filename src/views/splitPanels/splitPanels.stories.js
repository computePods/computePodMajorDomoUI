import m from 'mithril';

import { SplitPanels } from './splitPanels';

export default {
  title: 'Views/SplitPanels',
  component: SplitPanels,
}

const Template = ({ children, ...args }) => ({
  view: () => m(SplitPanels, args, children),
});

export const Primary = Template.bind({});
Primary.args = { }
