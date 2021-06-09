# Testing the web interface

In order to develop, unit, integration and end-to-end tests of our 
interface, we will use a mixture of 

- [Storybook](https://storybook.js.org/),

- [Mithril-ospec](https://github.com/MithrilJS/ospec),

- [Mithril-Query](https://github.com/MithrilJS/mithril-query)

Our tests, like our stories, will be located *beside* the code it tests in 
files named `<aName>.tests.js` (similar to Storybook's 
`<aName>.stories.js`) 

*If* ospec/Mithril-query does not work for our use, we could consider:

- [Jest](https://jestjs.io/)

- [Puppeteer](https://github.com/puppeteer/puppeteer), and

- [Jest-Puppeteer](https://github.com/smooth-code/jest-puppeteer)

## Development

Will be developed using Storybook stories working in a top down fashion. 
That is we begin by developing stories for "complete" pages and then 
refactor common components into their own stories. (The opposite of a 
[component driven interface](https://www.componentdriven.org/), though we 
will use these ideas). 

Lightweight documentation will be developed using a mixture of both pure 
Markdown `Readme.md` files in each page/component directory, as well as 
[Storybook's mdx](https://storybook.js.org/docs/react/api/mdx) 
documentation. 

To work with the storybook stories we use the `npm run storybook` command.

To work with the pure Markdown "stories" we use the `npx mdstart .` 
command which uses the 
[md-fileserver](https://github.com/commenthol/md-fileserver) live 
reloading Markdown file server. 

The current version of md-fileserver needs the following "fix" run, after 
any re-installation, in a shell in the base directory of this project: 

```
  cd node_modules/md-fileserver/node_modules
  ln -s ../../highlight.js .
```

(Or install globally and we do not seem to have this problem)

## Unit and integration testing

Will be tested using Jest

## End-to-end testing

**Individual components** will be tested using Jest+Puppeteer driving a 
running Storybook instance. 

**Whole Application** will be tested using Jest+Puppeteer driving a running 
webpack instance. 

## What to test?

Generally we are only interested in making sure the *functional* structure 
of the interface exists and behaves as documented. 

We are not overly interested in making sure the *surface* *visualisation* 
is consistent. This would be nice to have, but we should not expend effort 
making sure it is tested in much detail if at all.

--------------------------------------------------------------------------

## Missing Storybook addons 

Sometimes the Storybook "addons panel" disappears. To fix this in the 
"Console section" of the "Web developer's panel" type 
`localStorage.clear()` and then force a reload of the page. 

See [Addons panel not 
showing](https://github.com/storybookjs/storybook/issues/8383#issuecomment-541562349).
 