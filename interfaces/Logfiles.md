# MajorDomo logfiles interface

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

jsonTypes:
  logfileJson:
    user: userName
    lines:
      type: array
      items: string
    
```