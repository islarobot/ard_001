
var args = process.argv.slice(2);

var port_string = '/dev/ttyACM'+args[0];


const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const port = new SerialPort(port_string, { baudRate: 115200 })
const parser = new Readline()
port.pipe(parser)


//port.write('ROBOT PLEASE RESPOND\n')





port.on('open', function (err) {
 
   arduino_connect = true; 
   console.log('Arduino connected');
   
   parser.on('data', console.log)
   
});
