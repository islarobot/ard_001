

function draw_rastro(c, direccion, grado, valor, vl) {



const vertices = [
  -1.0, 1.0, 0.0,
  -1.0, -1.0, 0.0,
  1.0, -1.0, 0.0,
  1.0, 1.0, 0.0
];
const indices = [0, 1, 2, 3];
const height = 500;
const width = 500;

const canvas = document.createElement("canvas");
canvas.height = height;
canvas.width = width;
const gl = canvas.getContext("webgl");

// Create an empty buffer object to store vertex buffer
const vertex_buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
gl.bindBuffer(gl.ARRAY_BUFFER, null);

// Create an empty buffer object to store Index buffer
const Index_Buffer = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

// Vertex shader source code
const vertCode = `
    attribute vec3 coordinates;
 
    void main(void) {
      gl_Position = vec4(coordinates, 1.0);
    }
  `;
const vertShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertShader, vertCode);
gl.compileShader(vertShader);

// Fragment shader
const fragCode = `
    // fragment shaders don't have a default precision so we need
    // to pick one. mediump is a good default
    precision mediump float;
  
    uniform float u_width;
    uniform float u_height;
    uniform vec4 u_color1;
    uniform vec4 u_color2;
  
    void main(void) {
      vec2 st = gl_FragCoord.xy;
      float half_width = u_width / 2.0;
      float half_height = u_height / 2.0;

      float percent = (atan(st[0] - half_width, half_height - st[1]) - 3.14) / -0.785;
      gl_FragColor = mix(u_color1, u_color2, percent);
    }
  `;
const fragShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragShader, fragCode);
gl.compileShader(fragShader);

// Create a shader program object to store
// the combined shader program
const shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertShader);
gl.attachShader(shaderProgram, fragShader);
gl.linkProgram(shaderProgram);
gl.useProgram(shaderProgram);

/*======= Associating shaders to buffer objects =======*/

// Bind vertex buffer object
gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);

// Colors. vec4 [r, g, b, a]

if (direccion == 'R') {
const color1Loc = gl.getUniformLocation(shaderProgram, "u_color1");
gl.uniform4fv(color1Loc, [0, 0, 0, 1]);
const color2Loc = gl.getUniformLocation(shaderProgram, "u_color2");
gl.uniform4fv(color2Loc, [0, 1, 0, 1]);
}else {

const color1Loc = gl.getUniformLocation(shaderProgram, "u_color1");
gl.uniform4fv(color1Loc, [0, 1, 0, 1]);
const color2Loc = gl.getUniformLocation(shaderProgram, "u_color2");
gl.uniform4fv(color2Loc, [0, 0, 0, 1]);


}
// Width & height
const heightLoc = gl.getUniformLocation(shaderProgram, "u_height");
gl.uniform1f(heightLoc, height);
const widthLoc = gl.getUniformLocation(shaderProgram, "u_width");
gl.uniform1f(widthLoc, width);

// Get the attribute location
const coord = gl.getAttribLocation(shaderProgram, "coordinates");
gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(coord);
gl.enable(gl.DEPTH_TEST);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.viewport(0, 0, canvas.width, canvas.height);

// Draw the square
gl.drawElements(gl.TRIANGLE_FAN, indices.length, gl.UNSIGNED_SHORT, 0);

const pattern = c.createPattern(canvas, "no-repeat");
ctx.beginPath();

ctx.fillStyle = pattern;

var rad = grado * ( Math.PI / 180 );
var xx = vl.radio * Math.sin(rad);
var yy = vl.radio * Math.cos(rad);

c.moveTo(vl.x_circum, vl.y_circum);
c.lineTo(vl.x_circum+xx,vl.y_circum+yy);
if (direccion == 'R') {
c.arc(vl.x_circum,vl.y_circum,vl.radius_circum, rad, rad+0.785);
}else {
c.arc(vl.x_circum,vl.y_circum,vl.radius_circum, rad, rad-0.785);
}
ctx.lineTo(vl.x_circum, vl.y_circum);
ctx.fill();

console.log(vl.radio);
}



function beep(){

var osc = new Tone.Oscillator(440, "sine").toMaster().start();

setTimeout(function(){

//var osc = new Tone.Oscillator(440, "sine").toMaster().stop();

osc.stop();

 }, 50);


}


function angulo_absoluto(a,amp) {
	
return a+amp/2;	

}




function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}	

function circumA2circumB(a) {
var f;
if (a>=0) {
	f = a;
}
else {

f = 360+a;

}

	return f;
}


function circumB2circumA(a) {
var f;
if (a>=0 && a<=90) {
	f = a;
}
else {

f = a-360;
//console.log(f);

}


	return f;
}

function draw_basic_lines(id, vl){

//id: id del canvas
//x, y: centro de la circunferencia
//w, h: ancho y alto del rectángulo.
//vl --> .min angulo menor  (convencion 0 norte, 90 este, 180 sur, 270 oeste)
//vl.max --> angulo mayor
//radius: radio de la circunferencia.
//largo pata: largo del indicador del grado
// largo texto: distancia de los números al arco.
// deltax: corrección horizontal de los números negativos 

	//var angledelta = vl.angle;
	
x = vl.x_circum;
y = vl.y_circum;
w = vl.w_square;
h = vl.h_square;
radius = vl.radius_circum;
largopata = vl.largo_pata;
largotexto = vl.largo_texto;
deltax = vl.delta_negativos;
resolucion = vl.resolucion;



	
	var startAngleDeg = vl.min;
	
	var endAngleDeg = vl.max;
	
	var context = id;


   context.beginPath();
	context.rect(0, 0, w, h);
	context.fillStyle = "black";
	context.fill();
   

	var a;
	var b;
   var a1;
   var b1;
   var a2;
   var b2;


   var alfarad;
   var alfadeg;

   startAngleDegR = startAngleDeg - 90;
   if (startAngleDegR < 0){startAngleDegR = 360 + startAngleDegR;}
   endAngleDegR = endAngleDeg - 90;
   if (endAngleDegR < 0){endAngleDegR = 360 + endAngleDegR;}
   var centerAngleDeg = (endAngleDegR + startAngleDegR)/2;
   if (centerAngleDeg*2 < 360){centerAngleDeg = 360 - 2*centerAngleDeg;}



   var startAngle = startAngleDegR * ( Math.PI / 180 );
   var endAngle = endAngleDegR * ( Math.PI / 180 );

      
      
	//context.clearRect(0, 0, w, h);
	
   context.beginPath();

   context.arc(x, y, radius, startAngle, endAngle, false);
   //context.arc(0, 0, 1000, 200, 300, false);
   context.lineWidth = 7;
       
   context.font = "10px Arial";

	
	//dibujo las líneas de los palitos negativos.


	var startAngleDegD = startAngleDeg;	
	var endAngleDegD = endAngleDeg;
	if (endAngleDegD < startAngleDegD) {endAngleDegD = endAngleDegD + 360;}

	context.strokeStyle = rgbToHex(0,255,0);
	context.stroke();
	context.beginPath();
	context.lineWidth = 2;

	for(alfadeg = startAngleDegD;alfadeg<=endAngleDegD;alfadeg = alfadeg + resolucion){

       alfarad = alfadeg * (Math.PI/180);

//        b = y - Math.abs(radius * Math.sin(alfarad));
//			a = x - Math.abs(radius * Math.cos(alfarad));

			b = y - radius * Math.cos(alfarad);
			a = x + radius * Math.sin(alfarad);
		

			
			b1 = b - largopata * Math.cos(alfarad);
			a1 = a + largopata * Math.sin(alfarad);
				
			b2 = b - largotexto * Math.cos(alfarad);
			a2 = a + largotexto * Math.sin(alfarad);
     
     	context.lineWidth = 2;
      context.moveTo(x, y);
      context.lineTo(a1, b1);

		      
      
      
      var alfadeg1t = alfadeg;
      if (alfadeg1t => 360) {alfadeg1t = 360 - alfadeg;}
      if (alfadeg1t < 360) {alfadeg1t = alfadeg - 360;}
      context.fillStyle = '#00FF00';
      context.fillText(alfadeg1t,a2-deltax,b2-2);
	}
	
	context.strokeStyle = rgbToHex(0,255,0);
	context.stroke();
	
	

}
 


function draw_variable_lines(id,vl,a,d2)
	
	{

	
			console.log(a)
   var ctx = id;	
   
		if(d2 == 'R'){
		draw_line(ctx,vl,a,0);
		draw_line(ctx,vl,a,1);
		draw_line(ctx,vl,a,2);
		draw_line(ctx,vl,a,3);
		draw_line(ctx,vl,a,4);
		draw_line(ctx,vl,a,5);
		draw_line(ctx,vl,a,6);
		draw_line(ctx,vl,a,7);
		draw_line(ctx,vl,a,8);
		draw_line(ctx,vl,a,9);
		draw_line(ctx,vl,a,10);
		
		draw_line(ctx,vl,a,11);
		draw_line(ctx,vl,a,12);
		draw_line(ctx,vl,a,13);
		draw_line(ctx,vl,a,14);
		draw_line(ctx,vl,a,15);
		draw_line(ctx,vl,a,16);
		draw_line(ctx,vl,a,17);
		draw_line(ctx,vl,a,18);
		draw_line(ctx,vl,a,19);
		draw_line(ctx,vl,a,20);

		draw_line(ctx,vl,a,21);
		draw_line(ctx,vl,a,22);
		draw_line(ctx,vl,a,23);
		draw_line(ctx,vl,a,24);
		draw_line(ctx,vl,a,25);
		draw_line(ctx,vl,a,26);
		draw_line(ctx,vl,a,27);
		draw_line(ctx,vl,a,28);
		draw_line(ctx,vl,a,29);
		draw_line(ctx,vl,a,30);
		}else {
		draw_line(ctx,vl,a,0);
		draw_line(ctx,vl,a,-1);
		draw_line(ctx,vl,a,-2);
		draw_line(ctx,vl,a,-3);
		draw_line(ctx,vl,a,-4);
		draw_line(ctx,vl,a,-5);
		draw_line(ctx,vl,a,-6);
		draw_line(ctx,vl,a,-7);
		draw_line(ctx,vl,a,-8);
		draw_line(ctx,vl,a,-9);
		draw_line(ctx,vl,a,-10);
		
		draw_line(ctx,vl,a,-11);
		draw_line(ctx,vl,a,-12);
		draw_line(ctx,vl,a,-13);
		draw_line(ctx,vl,a,-14);
		draw_line(ctx,vl,a,-15);
		draw_line(ctx,vl,a,-16);
		draw_line(ctx,vl,a,-17);
		draw_line(ctx,vl,a,-18);
		draw_line(ctx,vl,a,-19);
		draw_line(ctx,vl,a,-20);

		draw_line(ctx,vl,a,-21);
		draw_line(ctx,vl,a,-22);
		draw_line(ctx,vl,a,-23);
		draw_line(ctx,vl,a,-24);
		draw_line(ctx,vl,a,-25);
		draw_line(ctx,vl,a,-26);
		draw_line(ctx,vl,a,-27);
		draw_line(ctx,vl,a,-28);
		draw_line(ctx,vl,a,-29);
		draw_line(ctx,vl,a,-30);

		
		}
		
		//console.log('Angle2: '+stream[stream.length-1].angle);


		
		
		
		
		
		
		
		
	}
	
	
	
	
function getCursorPosition(canvas, event,vl,s,m) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    //var x = event.clientX;
    //var y = event.clientY;
    var x_c = vl.x_circum;
    var y_c = vl.y_circum;
    var radius = vl.radius_circum;
    
    var jj = (x-x_c)*(x-x_c) + (y-y_c)*(y-y_c);
    var kk = Math.sqrt(jj);
    

    
    if (Math.abs(kk-radius).toFixed(0)<10) {
    
    var angulo = Math.asin((x-x_c)/kk);
    
    angulo = angulo*57.2958;
    
    if (m == 'manual') {
    	
   
   	s.emit 	
    	
    }
 	}
    
    
    
    
    
    
    
    
}



function draw_line(ctx, centro, angulo,i)

{
ctx.beginPath();
   		//console.log(angulo);
   		var aa = angulo - i;	
			var color2 = 170;
			
			


		ctx.beginPath();
		var  alfaradf = aa * (Math.PI/180);
		

		
     	var af;
     	var bf;
     	//var a1f;
     	//var b1f;
     	
    

			bf = centro.y_circum - centro.radius_circum * Math.cos(alfaradf);
			af = centro.x_circum + centro.radius_circum * Math.sin(alfaradf);
					

				     
      ctx.moveTo(centro.x_circum, centro.y_circum);
      	ctx.lineTo(af, bf);
				color2 = color2 - 60*Math.abs(i)/30;
				color2 = color2.toFixed(0);
 				ctx.strokeStyle = rgbToHex(0,color2,0);
		
				//console.log(color2)
				ctx.stroke();
				ctx.closePath();



}


function pepe(id,vl,a,d,p) {
	

id.beginPath();

id.fillStyle = p;



//ctx.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 6.28);
id.moveTo(vl.w_square/2, vl.h_square/2);
id.lineTo(250,0);
id.arc(250,250,250, -1.57, -0.785);
id.lineTo(250,250);
id.fill();
}
