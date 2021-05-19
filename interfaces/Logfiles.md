# MajorDomo logfiles interface

<!-- toc -->

The **Logfiles** interface provides the MajorDomo UI with access to one or 
more logfiles produced during a build cycle. The **Logfiles** interface is 
*read-only*. 

The `/logfiles` server route requests the contents of a specific logfile 
as a collection of lines. 

```yaml
httpRoutes:
  - route: /logfile/<taskPath>
    action: GET
    response: logfileJson
```

### JSON logfile structures

```yaml
jsonTypes:
  logfileJson:
    lines:
      __array__: string
    
```

where a <[taskPath](Build.md#task-paths)> is ..