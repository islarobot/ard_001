


function draw_rastro(c, direccion, grado, valor, vl) {

//mapeo valor a radio

var nuevo_valor = valor * vl.radius_circum / vl.max_valor;
var nuevo_valor = 100;



if (direccion == 'R') {
var amplitud = -45;
}else {
var amplitud = 45;
}
var amp_rad = amplitud * ( Math.PI / 180 );


var rad = grado * ( Math.PI / 180 );

var grado_ini = grado + 270;
//var rad = grado * ( Math.PI / 180 );
var rad_ini = grado_ini * ( Math.PI / 180 );
var grado_fin = grado_ini + amplitud;
var rad_fin = grado_fin * ( Math.PI / 180 );

if (direccion == 'R') {
var gradient = c.createConicalGradient(vl.x_circum, vl.y_circum, rad_fin, rad_ini);
gradient.addColorStop(1, '#00FF00');
gradient.addColorStop(0, '#000000');
var gradient1 = c.createConicalGradient(vl.x_circum, vl.y_circum, rad_fin, rad_ini);
gradient1.addColorStop(1, '#FF0000');
gradient1.addColorStop(0, '#000000');
}else {
var gradient = c.createConicalGradient(vl.x_circum, vl.y_circum, rad_ini, rad_fin);
gradient.addColorStop(1, '#000000');
gradient.addColorStop(0, '#00FF00');
var gradient1 = c.createConicalGradient(vl.x_circum, vl.y_circum, rad_ini, rad_fin);
gradient1.addColorStop(1, '#000000');
gradient1.addColorStop(0, '#FF0000');
}









if (direccion == 'R') {
	if (grado < vl.min_grad - amplitud) {
	var xx = nuevo_valor * Math.sin(( Math.PI / 180 ) * (vl.min_grad));
	var yy = nuevo_valor * Math.cos(( Math.PI / 180 ) * (vl.min_grad));	
	var xx1 = vl.radius_circum * Math.sin(( Math.PI / 180 ) * (vl.min_grad));
	var yy1 = vl.radius_circum * Math.cos(( Math.PI / 180 ) * (vl.min_grad));	
	var xx2 = nuevo_valor * Math.sin(rad);
	var yy2 = nuevo_valor * Math.cos(rad);
}else {
var xx = nuevo_valor * Math.sin(rad+amp_rad);
var yy = nuevo_valor * Math.cos(rad+amp_rad);	
var xx1 = vl.radius_circum * Math.sin(rad+amp_rad);
var yy1 = vl.radius_circum * Math.cos(rad+amp_rad);	
var xx2 = nuevo_valor * Math.sin(rad);
var yy2 = nuevo_valor * Math.cos(rad);
}
}else {
	if (grado > vl.max_grad - amplitud) {
	
var xx1 = vl.radius_circum * Math.sin(rad);
var yy1 = vl.radius_circum * Math.cos(rad);
var xx = nuevo_valor * Math.sin(rad);
var yy = nuevo_valor * Math.cos(rad);
var xx2 = nuevo_valor * Math.sin(( Math.PI / 180 ) * (vl.max_grad));
var yy2 = nuevo_valor * Math.cos(( Math.PI / 180 ) * (vl.max_grad));
		
	}else {
var xx1 = vl.radius_circum * Math.sin(rad);
var yy1 = vl.radius_circum * Math.cos(rad);
var xx = nuevo_valor * Math.sin(rad);
var yy = nuevo_valor * Math.cos(rad);
var xx2 = nuevo_valor * Math.sin(rad+amp_rad);
var yy2 = nuevo_valor * Math.cos(rad+amp_rad);
}
}




if (direccion == 'R') {
	if (grado < vl.min_grad - amplitud) {
		
		rad_fin = ( Math.PI / 180 ) * (vl.min_grad+270);
		
//c.arc(vl.x_circum,vl.y_circum,vl.radius_circum, rad_fin, rad_ini);
//c.arc(vl.x_circum,vl.y_circum,nuevo_valor, rad_fin, rad_ini);

c.beginPath();
c.moveTo(vl.x_circum, vl.y_circum);

c.lineTo(vl.x_circum+xx,vl.y_circum-yy);
c.arc(vl.x_circum,vl.y_circum,nuevo_valor, rad_fin, rad_ini);

c.lineTo(vl.x_circum, vl.y_circum);
c.fillStyle = gradient.pattern;
c.fill();
c.closePath();

c.beginPath();
c.moveTo(vl.x_circum+xx,vl.y_circum-yy);
c.lineTo(vl.x_circum+xx1,vl.y_circum-yy1);
c.arc(vl.x_circum,vl.y_circum,vl.radius_circum, rad_fin, rad_ini);

c.lineTo(vl.x_circum+xx2, vl.y_circum-yy2);
c.arc(vl.x_circum,vl.y_circum,nuevo_valor, rad_ini, rad_fin,true);
c.fillStyle = gradient1.pattern;
c.fill();

}else{

c.beginPath();
c.moveTo(vl.x_circum, vl.y_circum);

c.lineTo(vl.x_circum+xx,vl.y_circum-yy);
c.arc(vl.x_circum,vl.y_circum,nuevo_valor, rad_fin, rad_ini);

c.lineTo(vl.x_circum, vl.y_circum);
c.fillStyle = gradient.pattern;
c.fill();
c.closePath();

c.beginPath();
c.moveTo(vl.x_circum+xx,vl.y_circum-yy);
c.lineTo(vl.x_circum+xx1,vl.y_circum-yy1);
c.arc(vl.x_circum,vl.y_circum,vl.radius_circum, rad_fin, rad_ini);

c.lineTo(vl.x_circum+xx2, vl.y_circum-yy2);
c.arc(vl.x_circum,vl.y_circum,nuevo_valor, rad_ini, rad_fin,true);
c.fillStyle = gradient1.pattern;
c.fill();






}


}else {
	if (grado > vl.max_grad - amplitud) {
	rad_fin = ( Math.PI / 180 ) * (vl.max_grad+270);
	
//c.arc(vl.x_circum,vl.y_circum,vl.radius_circum, rad_ini, rad_fin);
//c.arc(vl.x_circum,vl.y_circum,nuevo_valor, rad_ini, rad_fin);


c.beginPath();
c.moveTo(vl.x_circum, vl.y_circum);

c.lineTo(vl.x_circum+xx,vl.y_circum-yy);
c.arc(vl.x_circum,vl.y_circum,nuevo_valor, rad_ini, rad_fin);

c.lineTo(vl.x_circum, vl.y_circum);
c.fillStyle = gradient.pattern;
c.fill();
c.closePath();

c.beginPath();
c.moveTo(vl.x_circum+xx,vl.y_circum-yy);
c.lineTo(vl.x_circum+xx1,vl.y_circum-yy1);
c.arc(vl.x_circum,vl.y_circum,vl.radius_circum, rad_ini, rad_fin);

c.lineTo(vl.x_circum+xx2, vl.y_circum-yy2);
c.arc(vl.x_circum,vl.y_circum,nuevo_valor, rad_fin, rad_ini, true);
c.fillStyle = gradient1.pattern;
c.fill();

}else {
c.beginPath();
c.moveTo(vl.x_circum, vl.y_circum);

c.lineTo(vl.x_circum+xx,vl.y_circum-yy);
c.arc(vl.x_circum,vl.y_circum,nuevo_valor, rad_ini, rad_fin);

c.lineTo(vl.x_circum, vl.y_circum);
c.fillStyle = gradient.pattern;
c.fill();
c.closePath();

c.beginPath();
c.moveTo(vl.x_circum+xx,vl.y_circum-yy);
c.lineTo(vl.x_circum+xx1,vl.y_circum-yy1);
c.arc(vl.x_circum,vl.y_circum,vl.radius_circum, rad_ini, rad_fin);

c.lineTo(vl.x_circum+xx2, vl.y_circum-yy2);
c.arc(vl.x_circum,vl.y_circum,nuevo_valor, rad_fin, rad_ini, true);
c.fillStyle = gradient1.pattern;
c.fill();
}

}


//c.strokeStyle = '#ff0000';
//c.stroke();
}



function draw_basic_lines(c, vl){

var min_rad = (vl.min_grad + 270) * (Math.PI / 180);
var max_rad = (vl.max_grad +270)* (Math.PI / 180);


c.beginPath();
c.lineWidth = 7;
c.moveTo(vl.x_circum, vl.y_circum);
c.lineTo(vl.x_circum-vl.radius * Math.cos(min_rad),vl.y_circum-vl.radius * Math.sin(min_rad));
c.arc(vl.x_circum,vl.y_circum,vl.radius_circum,min_rad,max_rad);
c.lineTo(vl.x_circum, vl.y_circum);
c.closePath();
c.strokeStyle = '#008000';
c.stroke();
c.fillStyle = "black";
c.fill();


}
