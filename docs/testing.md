# Testing the web interface

<!-- toc -->

In order to develop, unit, integration and end-to-end tests of our
interface, we will use a mixture of

- Our own **Mithril Component Viewer**,

- [AVA](https://github.com/avajs/ava),

- [Mithril-Query](https://github.com/MithrilJS/mithril-query)

- [Mock Service Workers](https://mswjs.io/)

Our **Mithril Component Viewer** (mcv) provides a component focused
collection of Mithril "pages", one for each component example. Each such
example is "constructed" in a CommonJS module located *beside* the code
for which it provides an example, in files named `<aName>.mcv.cjs`. These
Mithril Component Views (mcv) are crudely "compiled" into the mcv Mithril
application by the `createMCVapp` node script located in the [`mcv`
directory](../mcv).

Our tests, like our Mithril component examples, will be located *beside* the
code it tests in files named `<aName>.tests.js`.

## Development

Will be developed using MCV examples working in a top down fashion. That
is we begin by developing stories for "complete" pages and then refactor
common components into their own examples. (The opposite of a [component
driven interface](https://www.componentdriven.org/), though we will use
these ideas).

Lightweight documentation will be developed using pure Markdown
`Readme.md` files in each page/component directory.

To work with the MCV examples we use the `npm run dev` command which runs,
in parallel, the `createMCVapp` and the Parcel serve command on the
resulting app.

To work with the pure Markdown "stories" we use the `mdstart` command
(installed using a global installation of the
[md-fileserver](https://github.com/commenthol/md-fileserver) live
reloading Markdown file server).

## Unit and integration testing

Will be tested using AVA and Mock Service Workers.

## End-to-end testing

To be determined.

## What to test?

Generally we are only interested in making sure the *functional* structure
of the interface exists and behaves as documented.

We are not overly interested in making sure the *surface* *visualisation*
is consistent. This would be nice to have, but we should not expend effort
making sure it is tested in much detail if at all.
