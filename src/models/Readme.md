# MajorDomo client State

The main page will access three (global singleton) JSON objects:

1. The list of panels in the SplitPanel viewer.
2. The list of the current state of all "open" entities.
3. A hierarchical dictionary of the current known artefacts.

The current state of each "open" entity will contain the following
information:

1. The name of the panel in which it is being displayed (or the value
   None)

2. The JSON object which represents the object.
