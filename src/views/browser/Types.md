# Artifact Browser artifact types

There are three main types of artifacts:

1. Project Directories
2. Project Files
3. Project Targets

Each type of artifact has different things a user might want to do with 
the artifact. This means that we will use [Bulman 
dropdown-menus](https://bulma.io/documentation/components/dropdown/) with 
each artifact in the browser.

## Project Directories

With project directorys we can:

- Open/close directory listing in the browser **(initial priority)**
- Add new subdirectory
- Rename a directory
- Delete directory

## Project Files

With project files we can:

- Open a log file viewer     **(initial priority)**
- Open a file viewer/editor  **(initial priority)**
- Delete the file
- Rename a file
- Create an empty file

## Project Targets

- Open/close target listing in the browser
- Request a target to be built
- Stop the current build of a target


## Questions

1. How does a dropdown-menu item "open" an artifact in a new panel?

2. Can/should a dropdown-menu item "open" an artifact in an existing 
   panel? If so... how do we indicate which panel? If we have multiple 
   panels open at the same time... do we want a tool to reorder them? 

   The dropdown-menu will "open" an artifact by adding it to the "global" 
   splitPanels dropdown-menu of "open" artifacts. Then the use can select 
   which panel in which to view that artifact. Alas this is a two-step 
   shuffle ... How do we do this in one step? 

3. Renaming a directory or file might break a project target. How do we 
   deal whith this? 

4. Do we want an online project definition file editor?
   - Project definition files will be YAML files... do we just have an 
     online YAML editor? 

5. We want to keep this tool simple... should we just view artifacts 
   and start/stop build targets? (And expect all other changes will take 
   place using the underlying OS's tools?)

   We will prioritize the simple actions (open/close) first.
