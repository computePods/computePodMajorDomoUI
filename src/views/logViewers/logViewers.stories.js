import m from 'mithril';

import { LogViewers } from './logViewers';
import { LogViewersData } from './logViewersData';

export default {
  title: 'Views/LogViewers',
  component: LogViewers,
}

const Template = ({ children, ...args }) => ({
  view: () => {
    return m(LogViewers, args, children)
  },
});

export const Primary = Template.bind({});
Primary.args = {
  children: [ LogViewersData() ],
  //children: [ 'var data = 1;' ],
};
