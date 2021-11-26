
var args = process.argv.slice(2);

var port_string = '/dev/ttyACM'+args[0];


var SerialPort = require('serialport');

 
var sp = new SerialPort(port_string, { baudRate: 115200 }); // still works if NODE_ENV is set to development!
 

////  CUANDO SE ABRE LA CONEXION CON ARDUINO
 

 
sp.on("data", function(data) {
	
	
var p = data.toString();

var d = p.replace(/[^a-zA-Z0-9]/g, '');

console.log(d);
               
});



function parsePromised(json) {
  return new Promise(function(resolve, reject){
     try {
         const parsedJson = JSON.parse(json);
         resolve(parsedJson);
     } catch(error) {
        // we reach in this block if we encounter error while parsing some invalid given json
        //console.log('error');
        reject(error);
        //or reject(error.message);
     }
  });
}








