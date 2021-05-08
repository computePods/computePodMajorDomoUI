# ComputePods MajorDomo web based User Interface

## Architecture

MajorDomo is essentially a highly distributed build tool, which monitors 
its containers for changes and then can, depending upon what has changed 
and its current view of the build dependencies, will compute the minimal 
build possible. 

This project provides a Mithril based web interface to the back end server 
(which does the work *inside* the ComputePod). 
