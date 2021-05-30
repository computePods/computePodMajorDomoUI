import m from 'mithril';

import { MainPage } from './mainPage';
import { MainPageData } from './mainPageData';

export default {
  title: 'Pages/MainPage',
  component: MainPage,
}

const Template = ({ children, ...args }) => ({
  view: () => {
    return m(MainPage, args, children)
  },
});

export const Primary = Template.bind({});
Primary.args = {
  model: MainPageData(),
};
