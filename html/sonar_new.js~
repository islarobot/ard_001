

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
