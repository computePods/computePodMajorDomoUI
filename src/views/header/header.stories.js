import m from 'mithril';

import { Header } from './header';

export default {
  title: 'Views/Header',
  component: Header,
};

const Template = ({ children, ...args }) => ({
  view: () => m(Header, args, children),
});

export const Primary = Template.bind({});
Primary.args = { };
