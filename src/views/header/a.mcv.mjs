import m from 'mithril';

import { Header } from './header';

export default {
  view: function(vnode) {
    return m(Header, {
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
    })
  }
};

