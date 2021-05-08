# Testing the web interface

In order to develope, unit, integration and end-to-end tests of our 
interface, we will use a mixture of 

- [Storybook](https://storybook.js.org/),

- [Jest](https://jestjs.io/),

- [Puppeteer](https://github.com/puppeteer/puppeteer), and

- [Jest-Puppeteer](https://github.com/smooth-code/jest-puppeteer)

## Development

Will be developed using Stoybook stories working in a top down fashion. 
That is we begin by developing stories for "complete" pages and then 
refactor common components into their own stories. (The opposite of a 
[component driven interface](https://www.componentdriven.org/), though we 
will use these ideas). 

Lightweight documentation will be developed using Markdown `Readme.md` 
files in each page/component directory. We should also consider using 
Storybook's documentation as well as potentially 
[Docz](https://www.docz.site/). 

## Unit and integration testing

Will be tested using Jest

## End-to-end testing

**Individual components** will be tested using Jest+Puppeteer driving a 
running Storybook instance. 

**Whole Application** will be tested uins Jest+Puppeteer driving a running 
webpack instance. 
