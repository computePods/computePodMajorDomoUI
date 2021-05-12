# General Layout

All pages will consist of a, possibly hidden, artifact "browser", as well 
as one or more panels containing information about one or more selected 
artifacts. The sizes of the panels should be drag-able using 
[Splitjs](https://github.com/nathancahill/split) 

## Artifact Browser

The artifact browser is essentially a (unfoldable) hierarchical view of 
the evolving build.

## Artifact panels

**Project dependency graph** A D3/SVG graph of the build dependencies. 
Since we expcet these dependencies to be cyclic, this graph should be 
shown at various "levels of unfolding".

**File viewer/editors** A syntax highlighted viewer or editor of a given 
textual artifact. We expect the syntax highlighting to be done by 
[Prism](https://prismjs.com/), while the editor will be provided by 
[CodeJar](https://github.com/antonmedv/codejar). 

**Log viewers** A syntax highlighted viewer of an evolving log file from a 
specific build step. 

