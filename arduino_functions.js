//arduino functions
function zeroFill( number, width )
{
  width -= number.toString().length;
  if ( width > 0 )
  {
    return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
  }
  return number + ""; // always return a string
}

function regla_de_tres(input,min_in,max_in,min_out,max_out,exception) {

var output = (input - min_in) * (max_out - min_out) / (max_in - min_in) + min_out;


if (input == exception) {
	output = 9999;
}

if (output < 0) {
	output = 100;
}

return parseInt(output);

}


module.exports = {
  generate_amplitude_function: function (datos) {
    
var param = datos.substr(0,2);

var larg = datos.length-1;
var prim = datos.indexOf('_');
var seg = datos.indexOf('_',prim+1);
var ter = datos.indexOf('_',seg+1);

var angulo = datos.substr(prim+1,seg-prim-1);
var direccion = datos.substr(seg+1,ter-seg-1);

 var rad = angulo*3.1416/180
  
 var value = Math.abs(50*Math.sin(rad).toFixed(2));
 
 return param+'_'+angulo+'_'+direccion+'_'+value+'_\n';
    
  },




funcion_conversion_node_ardu: function(data)
{



data_object = JSON.parse(data);

/// bytes: 1 para el parametro. 2 para el angulo+direccion 1 para el valor 0-100 

// P000l999

var param_string = data_object.inputParam;

//var param_code = String.fromCharCode(param_string);

var angle_string = data_object.inputAngle;

var angle_int = parseInt(angle_string);

var sign1 ='';

if (angle_int<0) {
	sign1 = 'p';
}else {
	sign1 = 'n';
}


var angle_int_abs = Math.abs(angle_int);

var angle_out = zeroFill(angle_int_abs,3);

//console.log(angle_out);

var output = param_string+sign1+angle_out;

//console.log(output);


return output;

},



funcion_conversion_ardu_node: function(datos)
{

//console.log('Datos: '+datos);

if (datos.length == 9) {


var d = datos.substr(0,4);

var d_int = parseInt(d);

//console.log(d_int);

d_int = regla_de_tres(d_int,200,2000,0,100,9999)



var a = datos.substr(4,6);

var a_int = parseInt(a);

//console.log(a_int);

var output = {outputD:d_int,outputA:a_int};




var output_JSON = JSON.stringify(output);


}else {
output_JSON = JSON.stringify({outputD:0,outputA:0});
}
//console.log(output_JSON);

return output_JSON;

}

};

