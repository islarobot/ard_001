


function draw_rastro(c, direccion, grado, valor, vl) {

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
}else {
var gradient = c.createConicalGradient(vl.x_circum, vl.y_circum, rad_ini, rad_fin);
gradient.addColorStop(1, '#000000');
gradient.addColorStop(0, '#00FF00');
}


c.fillStyle = gradient.pattern;



c.beginPath();


if (direccion == 'R') {
var xx = vl.radius_circum * Math.sin(rad+amp_rad);
var yy = vl.radius_circum * Math.cos(rad+amp_rad);
}else {
var xx = vl.radius_circum * Math.sin(rad);
var yy = vl.radius_circum * Math.cos(rad);

}
c.moveTo(vl.x_circum, vl.y_circum);

c.lineTo(vl.x_circum+xx,vl.y_circum-yy);

if (direccion == 'R') {
	if (grado !=80) {
c.arc(vl.x_circum,vl.y_circum,vl.radius_circum, rad_fin, rad_ini);
}else
{

}


}else {
c.arc(vl.x_circum,vl.y_circum,vl.radius_circum, rad_ini, rad_fin);
}
c.lineTo(vl.x_circum, vl.y_circum);

c.fill();
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
