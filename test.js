
var ipc=require('node-ipc');

var i=10;
var direccion='L';
var ahora = Date.now();
var delay = 300;

 
ipc.config.id   = 'hello';
ipc.config.retry= 1500;
ipc.config.silent = true;

//// ME CONECTO A SERVER.JS

ipc.connectTo('world');

ipc.of.world.emit('message','pepe');
