// Footer.stories.js

import m from 'mithril';

import { Footer } from './footer';

export default {
  title: 'Layout/Footer',
  component: Footer,
};

const Template = ({ children, ...args }) => ({
  view: () => m(Footer, args, children),
});

export const Primary = Template.bind({});
Primary.args = { }