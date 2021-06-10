# MajorDomo client Main Page

<!-- toc -->

The main page consists of the following components:

1. A Header
2. A collection of SplitPanels
3. A Footer

Each panel in the SplitPanels itself contains a Header.

The MainPage Header contains a menu which creates a new split panel.

The SplitPanel Header contains a menu which has the following items:

1. Close this entity
2. A separator
3. Close this split panel
4. A separator
5. View the artefact browser in this panel
6. A separator
7. A list of "open" entities which can be viewed in this panel

## [State](../../models/Readme.md)

The main page will access three (global singleton) JSON objects:

1. The list of panels in the SplitPanel viewer.
2. The list of the current state of all "open" entities.
3. A hierarchical dictionary of the current known artefacts.
