# Split Panels

We will use 
[split.js](https://github.com/nathancahill/split/tree/master/packages/splitjs) 
to provide a *small* collection of side-by-side panels whose width can be 
changed by the user. 

Each panel will have a dropdown-menu of all currently open artifacts. 

The dropdown-menu will *always* have an artifact browser entry. 

Each panel will have a "close" button. 

## Questions

1. Can an artifact be "open" in more than one panel at the same time? If 
   so how do (editor) updates get propogated across all open instances? 

2. How do we add a new panel? (Or do we just un-collapse/un-hide it?)

3. How do we remove an existing panel? (Or do we just collapse/hide it?)
