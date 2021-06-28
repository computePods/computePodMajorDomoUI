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

## MajorDomo WebSocket dynamic update system

The ComputePods MajorDomo (UI and pod server) can communicate dynamic
updates via a long running WebSocket connection. This WebSocket allows the
MajorDomo pod server to push changes to the pod server's internal state to
the MajorDomo UI.

There are two primary types of pod server state changes which the UI needs
to know about:

1. Addition or removal of artefacts which can be queried or "opened". All
   such notifications need to update the [collection of
   artefacts](artefacts/Readme.md).

2. Notification that an artefact has changed. All such notifications need
   to update any corresponding open entity. The UI is then responsible for
   *pulling* any changes from the pod server. For most open entities, it
   is simplest to pull the whole artefact from the pod server. For some
   open entities, such as, for example, logFiles, the UI can request only
   changes after a particular "logFile line", should be pulled.
