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


## State

The main page will contain three JSON objects:

1. The list of panels in the SplitPanel viewer.
2. The list of the current state of all "open" entities.
3. A hierarchical dictionary of the current known artefacts.

The current state of each "open" entity will contain the following 
information: 

1. The name of the panel in which it is being displayed (or the value 
   None) 

2. The JSON object which represents the object.