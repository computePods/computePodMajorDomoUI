# MajorDomo Artefacts client state

The artefacts model manages the collection of currently known artefacts
obtained from one or other of the federation MajorDomo backend servers.
The path to an artefact in this (hierarchical) collection, corresponds to
the URLs used to access that artefact on the MajorDomo pod server.

The artefact model is a hierarchy of object (dictionaries) one object at
each level of the hierarchy.

As the user expands the hierarchy addition detail may be added at what is
currently a leaf node of the hierarchy.

This hierarchical structure is consumed by the [browser
panel](../views/browser).

By definition, a leaf node has no branches.
