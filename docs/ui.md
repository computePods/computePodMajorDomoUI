# User interface (webpages)

## Goal

We need a *simple* and *dynamic* user interface with which to control and 
monitor the ComputePods (ongoing) behaviour. This interface should be 
run-able inside modern browsers (such as FireFox and Chromium). 

## Nice to have 

We will need a hierarchical view of project files, as well as tasks and 
associated logfiles. 

Since the ComputePods will build up an intimate knowledge of the artefacts 
it builds, down to locations of cross-references, figures, chapters, 
sections, etc for ConTeXt, as well as variable and function definitions 
for ANSI-C and JoyLoL, it will eventually make sense to expose this 
knowledge by being able to "jump" to the textual source underlying each 
(generalised) reference. This suggests the use of an embedded "code" 
editor (CodeJar), as well as syntax highlighting (Prism). 

The ability to have multiple panes open on tasks side by side, suggests 
the use of a split panel JavaScript tool (SplitJS). 

The ability to visualise the graphical networks of, for example, 
(potentially cyclic) build dependency networks, or concept cross-reference 
networks, suggests the use of D3 (and SVG). 

Word clouds, driven by D3, might make nice entries into the concept 
cross-reference networks (clouds). 

## UI 

Our UI itself is based upon "standard" JavaScript run in the client's 
browser. 

- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)

  - [W3C DOM](https://www.w3.org/TR/DOM-Level-2-HTML/)

  - [Mozilla DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)

## UI Packages

Our objective in choosing the UI packages is to keep things as "simple" 
and "independently" "mixable" as possible. At this point it is hard to see 
how we might want to mix and match tools to create a useful user 
experience, but certainly keeping things as modular as possible will allow 
for future inspiration. 

1. [Mithril](https://mithril.js.org/)

2. [Bulma](https://bulma.io/documentation/)

3. [D3](https://d3js.org/)

  - [D3-mitch-tree](https://github.com/deltoss/d3-mitch-tree)

4. [SplitJS](https://github.com/nathancahill/split/tree/master/packages/splitjs)

5. [CodeJar](https://medv.io/codejar/)

6. [Prism](https://prismjs.com/) Note we will probably eventually need to 
   create our own language for JoyLoL. So we want to use Prism now to 
   allow this in the future. We will use the Webpack, babel and 
   [babel-plugin-prismjs](https://github.com/mAAdhaTTah/babel-plugin-prismjs) 
   development tools (below) to pragmatically produce our own minified 
   prism files. 
   
7. [FontAwesome(free)](https://github.com/FortAwesome/Font-Awesome) A 
   collection of fonts and [icons](https://fontawesome.com/icons). 

## UI development tools

1. [Storybook](https://storybook.js.org/)

2. [Sass](https://sass-lang.com/)

3. [Webpack](https://webpack.js.org/)

4. [Babel](https://babeljs.io/)

5. [babel-plugin-prismjs](https://github.com/mAAdhaTTah/babel-plugin-prismjs) 
   is required to *locally* configure and serve prismjs.

6. [Mock Service Workers](https://mswjs.io/) is used to develop and test 
   the client-UI separate from the server.

7. [AJV](https://ajv.js.org/) might be used to test/verify the rest 
   interface between the client and the server. 
