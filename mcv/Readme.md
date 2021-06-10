# Mithril Component Viewer

This Mithril Component Viewer is a very *simple* way to "compile" a
collection of Mithril components into a single Mithril application.

We use the `createMCVapp` node script to find all files with the pattern
`*.mcv.{cjs,js,mjs}`.

This application assembles all component example pages into a collection
of Mithril routes displaying each example component.

The header and footer of the overall application contains a menu of links,
one for each component example.

This allows the browser's web-debugging tool to analyse the example
component's internal structure.
