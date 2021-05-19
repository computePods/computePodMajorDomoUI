# MajorDomo project descriptions

<!-- toc -->

The **Projects** interface provides the MajorDomo UI with a list of 
existing Project descriptions for a user, together with the associated 
build targets. 

## Getting project definitions

```yaml
httpRoutes:
  - route: /projects/<workspacePath>/<project>
    action: GET
    response: projectDefinition
```

### Project definition files

On *disk* a project definition *file* is a YAML file loosley based upon the 
[Python Sake](http://tonyfischetti.github.io/sake/) format. For example:

```yaml
# Example Project definition for the 'Measuring Heyting algebras' paper

description: |
  The Measuring Heyting algebras paper looks at...

targets:
  html:
    help: build the html version of the paper
    dependencies:
      - measuringHeyting.pdf
    worker: html2pdf

  pdf:
    help: build the pdf version of the paper
    dependencies:
      - measuringHeyting.tex
    worker: context
```

### JSON project definition

A project definition is a string description together with a dictionary of 
targets. Each target key is the name of a target. Each target item 
consists of a help string, a list of known (top-level file) dependencies, 
and the name of a ComputePods worker who has the competence to build this 
target. 

```yaml
jsonTypes:
  projectDefinition:
    description: string
    targets:
      __dictionary__:
        help: string
        dependencies:
          __array__: string
        worker: string
```
