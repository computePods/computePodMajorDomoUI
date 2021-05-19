# MajorDomo original project files

<!-- toc -->

The **Files** interface provides a way for the MajorDomo UI to access and 
list the currently known project files. 

Project files consist of (sub)directories, original project "source" 
files, as well as project definition files. 

User "workspaces" are simply directory trees located in the user's 
personal "commons" directory to which the ComputePods MajorDomo server has 
access. 

## Listing directories and files

```yaml
httpRoutes:
  - route: /files/<workspacePath>
    action: GET
    response: workspaceTree
```
### Workspace Paths

Workspace paths are essentially Unix/Web paths (using the `/` separator) 
relative to the user's personal "commons" directory. 

### JSON workspaceTree

A `workspaceTree` is a recursive JSON structure which captures a 
"directory's" contained sub-directories as well as files. 

```yaml
jsonTypes:
  workspaceTree:
    directories: 
      __dictionary__: workspaceTree
   files:
     __dictionary__: string
```

**Question**: how do get the types of a given file? Do we simply rely on 
an extension mapping? 
