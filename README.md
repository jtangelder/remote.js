# Remote.js

Use your touchdevice as input for your desktop browser. Demo is at http://remotejs.joriktangelder.nl/

## Install

`npm install` and run `make start` to start the socketserver on port 9000.

## Connections
Remote.js should support these kind of connections, until now it only has a public channel.

#### Public --- Remote > Receiver
1 or more remotes to 1 or more receivers. Always connect to a global channel. 
The server can send data to the remotes and receivers. 

Use case: Show all connected remotes on a screen without any identification.


#### Private --- Remote > Receiver
1 or more remotes to a private receiver. Remotes need to type in the unique code the receiver gets. 
The receiver also can send data to the remotes. The receiver key should become the channel key. 

Use case: Let users interact with the PC and control it with their devices, like controlling a presentation.
