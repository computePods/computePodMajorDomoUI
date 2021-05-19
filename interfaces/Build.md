# MajorDomo build interface

<!-- toc -->

The **Build** interface provides the MajorDomo UI with access to the 
current build progress as well as dependency graph for a given project 
target. 

## Requesting the build of a project target

*Requesting* the build of a project target will typically take a number of 
minutes. As such, the *request* for a build is an *asynchronous* action. 
This means that there is no direct response. 

```yaml
httpRoutes:
  - route: /build/<workspacePath>/<project>/<target>
    action: GET
    response: none
```

where <[WorkspacePaths](Files.md#workspace-paths)> are Unix/Web paths 
relative to the user's "commons" directory. 

## Getting a list of current build tasks

```yaml
httpRoutes:
  - route: /build/current
    action: GET
    response: buildTasks
```

### JSON buildTasks

```yaml
jsonTypes:
  buildTasks:
    __array__: taskStatus

  taskStatus:
    target: string
    progress: int
    dependencies:
      __array__: string
```

## Getting the status of a single build task

```yaml
httpRoutes:
  - route: /build/status/<taskPath>
    action: GET
    response: taskStatus
```

### Task paths

Task paths are essentially Unix/Web paths (using the `/` separators) 
relative to a project build target. 

A taskPath consists of a <[workspacePath](Files#workspace-paths)>, a 
of the extea <target>, followed by subsequent "(sub)directories" which are 
of the extepart extended dependency hierarchy for that build target. 

**Question** Cyclic builds, such as, for example, ConTeXt documents, will 
have multiple "copies" of a dependency. One copy for each "time" the build 
has to proceed "around the cycle". These copies will be distinguished by 
"level-decorators" (cycle numbers). We need to make sure the hierarchy 
names of these "(sub)directories" remains stable as the build goes around 
a cycle multiple times. ***How do we do this?***
