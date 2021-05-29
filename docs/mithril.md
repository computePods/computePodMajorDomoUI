# Using Mithril

We use [Mithril](https://mithril.js.org/) to provide our browser based 
Model View Controller. Mithril provides tools to work asynchronously with 
the server using [promises](https://mithril.js.org/promise.html), 
typically provided by the [Mithril request 
interface](https://mithril.js.org/request.html). Mithril objects, called 
[components](https://mithril.js.org/components.html), are simply [Plain 
Old JavaScript 
Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects) 
which have a `view` method. 

Any Mithril component *is* itself a model which can hold its own 
[state](https://mithril.js.org/components.html#state). 

Any Mithril component integrates with the browser's underlying view by 
implementing a `view` method. 

Any Mithril component integrates with the browser's underlying controller 
by adding any of the standard 
[GlobalEventHandlers](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers) 
as an attribute. 

## Our use of Mithril

Any Mithril component which is related in some way to information on the 
server, will consist of a [mixin](https://javascript.info/mixins) of the 
following two interfaces: 

1. A Mithril View mixin, which uses a Mithril `view` method to display the 
   component to the user. 

2. A Mithril Connector mixin, which uses a [Mithril 
   request](https://mithril.js.org/request.html) to obtain the component 
   data for a particular target URL on the server, via a HTTP request to 
   the MajorDomo server's REST interface. 

These two mixin parts of a Mithril component will "communicate" using a 
common `data` property. The pairing itself will be determined by the 
unique prefix of each URL. This means that different server URL mount 
points *must* have unique prefixes. 

We will implement this mixin pattern using the 
[Object.assign()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) 
method. 
