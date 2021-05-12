# Artifact Browser

The artifact browser is essentially a (unfoldable) hierarchical view of 
the evolving build.

The "base" of the hierarchy will consist of a list of the user's current 
projects. Each project will consist of the hierarchical view of the 
project's (file) artifacts, project definitions, as well as intermediate 
build steps (hung off of the defining project definitions). 

*If* the build dependencies were acyclic, *then* we could display the 
build artifact resulting from the build of a given target as a 
hierarchical tree "hung" off the target in the project definition.

Unfortunately since we are primarily interested in the fine scale 
dependencies of ConTeXt documents, the typcical build dependencies *will* 
be cyclic. 

To deal with this cyclic structure, the majorDomo *server* will 
"auto-magically" unfold the cyclic structure into a number of "levels" as 
the build tool detects that subsequent progress around a cycle are 
required. IN particular, this means that the "depth" hierarchical tree of 
the built artifacts will not be constant, but will grow in depth as the 
build cycles unfold. 

While the user is ultimately most interested in the goal, placing the goal 
at the top would mean that the build hierarchy might continually "expand 
in the middle" "away" from the user. 

Items in the hierarchical browser, will be color coded depending upon their 
build state. We may also provide an associated icon hinting at the build 
status. 

**Artifact browser width**: The width of the un-hidden artifact browser 
should be drag-able using 
[Splitjs](https://github.com/nathancahill/split). 

**Selecting a build target**: The hierarchy will contain "project" files 
which will "unfold" to display the various targets. The user can select a 
target and request that it be built. 

**Controlling Focus** A fully unfolded version of the eventual build 
hierarchy will be very large and conceptually unmanagable. This suggests 
that the user should be able to alter the current "focus" of the 
hierarchy. The higher levels which are currently "out of focus" would 
provide an essential "bread crumb" while the currently focused part of the 
hierarchy would "fill" the "rest" of the artifact browser. This then 
requires tools (buttons) which the user can use to defocus and or 
fold/unfold the build hierarchy. 
