

var ipc=require('node-ipc');

var i=10;
var direccion='R';
var ahora = Date.now();
var delay = 200;

 
ipc.config.id   = 'hello';
ipc.config.retry= 1500;
ipc.config.silent = true;

//// ME CONECTO A SERVER.JS

ipc.connectTo('world');

//ipc.of.world.emit('message','pepe');


interv = setInterval(cosa, delay);
	
function cosa(){
	
	
	var d = parseInt(1023*Math.random());	
	d = 50;
	//i = 75;
	//direccion = 'L';
	var data_object = {direccion:direccion,distancia:d,angulo:i}
	
	var data_json = JSON.stringify(data_object);
ipc.of.world.emit('message',data_json);
//ipc.of.world.emit('message',"pepe");
console.log(data_json);
ahora = Date.now() + delay;

if (i > 80) {direccion = 'L';}
if (i < -80) {direccion = 'R';}
if (direccion == 'L') {i=i-1;}
if (direccion == 'R') {i=i+1;}
}












