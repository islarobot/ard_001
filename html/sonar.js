

function draw_rastro(c, direccion, grado, valor, vl) {



const vertices = [
  -1.0, 1.0, 0.0,
  -1.0, -1.0, 0.0,
  1.0, -1.0, 0.0,
  1.0, 1.0, 0.0
];
const indices = [0, 1, 2, 3];
const height = vl.h_square;
const width = vl.w_square;

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



c.beginPath();

c.lineWidth = 1;
var grado_1 = grado + 270;
var rad = grado* ( Math.PI / 180 );
var rad_1 = grado_1 * ( Math.PI / 180 );

//var rad =  * ( Math.PI / 180 );
//var direccion1 = 'R';
console.log(grado);

var xx = vl.radius_circum * Math.sin(rad);
var yy = vl.radius_circum * Math.cos(rad);
//console.log(grado+' '+xx+' '+yy);
c.moveTo(vl.x_circum, vl.y_circum);
c.lineTo(vl.x_circum+xx,vl.y_circum-yy);
if (direccion1 == 'R') {
c.arc(vl.x_circum,vl.y_circum,vl.radius_circum, rad_1, rad_1-0.1);
}else {
c.arc(vl.x_circum,vl.y_circum,vl.radius_circum, rad_1, rad_1+0.1);
}
c.lineTo(vl.x_circum, vl.y_circum);
c.closePath();
c.strokeStyle = '#008000';
c.stroke();
//c.fillStyle = pattern;
c.fillStyle = 'green';
c.fill();

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