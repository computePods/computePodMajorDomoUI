# MajorDomo build interface

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

## Getting a list of current build tasks

```yaml
httpRoutes:
  - route: /build/current
    action: GET
    response: buildTasks
```



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