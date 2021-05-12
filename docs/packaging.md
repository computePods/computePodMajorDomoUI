# Packaging the web interface

## Using Webpack to bundle our web interface

We use [webpack](https://webpack.js.org/) to bundle our web inerface.

We use various [webpack loaders](https://webpack.js.org/loaders/) (or 
[awesome-webpack-loaders](https://github.com/webpack-contrib/awesome-webpack#loaders))
to bundle/compile non-javascript artifacts. 

In particular we use:

- ???

## Discovering module dependencies

We use [madge](https://github.com/pahen/madge#cli) to produce various 
views of the dependency tree of our source code. 

## Discovering NPM dependencies

We use the 
[node-dependency-visualizer](https://github.com/0815fox/node-dependency-visualizer) 
to produce a (huge) svg visualization of the NPM package dependencies. The 
command line: 

    node_modules/.bin/node-dependency-visualizer | 
      dot -Tsvg > node-module-dependency-tree.svg

produces the svg file, and the command:

    inkscape node-module-dependency-tree.svg

will view it. You can use the `+`/`-` numeric-keypad-keys to zoom in and 
out. You can use the `^LeftArrow`/`^RightArrow` to pan left and right, 
and`^UpArrow`/`^DownArrow` to pan up and down. 
