# Remote.js

Use your touchdevice as input for your desktop browser. Demo is at http://remotejs.joriktangelder.nl/

![Awesome](http://image.shutterstock.com/display_pic_with_logo/72409/72409,1163258695,1/stock-photo-man-asleep-on-the-couch-with-tv-remote-control-firmly-in-hand-2151450.jpg)

## Install

`npm install` and run `make start` to start the socketserver on port 9000.

## Connections
Remote.js should support these kind of connections, until now it only has a public channel.

#### Public - Remote to Receiver
1 or more remotes to 1 or more receivers. Always connect to a global channel. 
The server can send data to the remotes and receivers. 

Use case: Show all connected remotes on a screen without any identification.


#### Private - Remote to Receiver
1 or more remotes to a private receiver. Remotes need to type in the unique code the receiver gets. 
All clients can send data around. The receiver key should become the channel key. 

Use case: Let users interact with the PC and control it with their devices, like controlling a presentation.
