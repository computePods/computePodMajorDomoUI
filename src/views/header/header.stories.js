import m from 'mithril';

import { Header } from './header';

export default {
  title: 'Components/Header',
  component: Header,
};

const Template = ({ children, ...args }) => ({
  view: () => m(Header, args, children),
});

export const Primary = Template.bind({});
Primary.args = {
  theLink: {
  	link: '/',
  	text: 'ComputePods MajorDomo'
  },
  theMenu: [
  	{
  	  link: '/',
  	  text: 'this is silly'
  	},
  	{
  	  link: true,
  	  text: 'this is not silly'
  	},
  	{
  	  link: '/',
  	  text: 'this is very silly'
  	}
  ]
};
