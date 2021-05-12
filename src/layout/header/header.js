/** @jsx m */

import m from 'mithril';

export const Header = {
  view: ({ attrs }) => (
    <header>
      <div class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item" href="/">ComputePods MajorDomo</a>
          <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div class="navbar-menu">
          <div class="navbar-end">
            <button class="button is-primary">
              click me!
            </button>
          </div>
        </div>
      </div>
    </header>
  ),
};
