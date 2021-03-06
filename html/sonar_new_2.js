

function pepe(vl,cd) {

//console.log(vl.w_square)

//precision mediump float;
var jurjur = parseFloat(cd).toFixed(2);
var jurjur_rad = jurjur * ( 3.1416 / 180.0 );


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
var fragCode = `
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
		
		float sector = 45.0;
		float pi = 3.1416;
		float sector_rad = (-1.0) * sector * ( pi / 180.0 );
		
		
		//float sector_rad1 = jurjur_rad;		

      //float percent = (atan(st[0] - half_width, half_height - st[1]) - 3.14) / -0.785;
      float percent = (atan(st[0] - half_width, half_height - st[1]) - 3.14) / sector_rad;
     
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
const color1Loc = gl.getUniformLocation(shaderProgram, "u_color1");
gl.uniform4fv(color1Loc, [0, 1, 0, 1]);
const color2Loc = gl.getUniformLocation(shaderProgram, "u_color2");
gl.uniform4fv(color2Loc, [0, 0, 0, 1]);

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

var output = document.getElementById("output");
output.height = height;
output.width = width;

var amplitud = 45;

var grado_posicion = cd;
var grado_posicion_rad = grado_posicion * ( Math.PI / 180 );
var posicion_x = vl.x_circum + vl.radius_circum * Math.sin(grado_posicion_rad);
var posicion_y = vl.y_circum - vl.radius_circum * Math.cos(grado_posicion_rad);

var grado_arco_ini = grado_posicion + 270;
var grado_arco_rad_ini = grado_arco_ini * ( Math.PI / 180 );

var grado_arco_fin = grado_arco_ini + amplitud;
var grado_arco_rad_fin = grado_arco_fin * ( Math.PI / 180 );


const ctx = output.getContext("2d");
//console.log(vl.w_square)
ctx.beginPath();
ctx.rect(0, 0, vl.w_square, vl.h_square);
ctx.stroke();

const pattern = ctx.createPattern(canvas, "no-repeat");
ctx.beginPath();

ctx.fillStyle = pattern;

ctx.moveTo(vl.x_circum, vl.y_circum);


ctx.lineTo(posicion_x,posicion_y);
ctx.arc(vl.x_circum, vl.y_circum,vl.radius_circum, grado_arco_rad_ini, grado_arco_rad_fin);
//ctx.closePath();
ctx.lineTo(vl.x_circum, vl.y_circum);
ctx.fill();
//ctx.stroke();


}