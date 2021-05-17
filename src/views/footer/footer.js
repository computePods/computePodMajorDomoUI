import m from 'mithril';

export const Footer = () => {
  return {
    view: () =>
      m(
        'footer',
        { class: 'footer' },
        m(
          'div',
          { class: 'content has-text-centered' },
          m('a', {href: 'https://github.com/computePods' }, 'ComputePods'),
        ),
      ),
  };
};
