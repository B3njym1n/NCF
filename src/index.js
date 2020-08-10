var canvas = document.createElement("canvas");
var canvas_w = 300 * 5;
var canvas_h = 200 * 5;
var unit = 8;
var A = 100 * unit; // flag width
var B = 150 * unit; // flag length
var major_axis = 79.251 * unit;
var minor_axis = 33.1 * unit;
var G = 10.731 * unit;
var H = 4.188 * unit;

canvas.id = "game";
canvas.setAttribute("width", canvas_w)
canvas.setAttribute("height", canvas_h);

var pos_x = [
    0,
    25.26,
    45,
    57.83,
    67.81,
    76.43,
    85.17,
    94.83,
    103.57,
    112.19,
    122.17,
    135,
    154.74,
    180,
    205.26,
    225,
    237.83,
    247.81,
    256.43,
    265.17,
    274.83,
    283.57,
    292.19,
    302.17,
    315,
    334.71,
];
var pos_y = [
    4.83,
    13.57,
    22.19,
    32.17,
    45,
    64.74,
    90,
    115.26,
    135,
    147.83,
    157.81,
    166.43,
    175.17,
    184.83,
    193.57,
    202.19,
    212.17,
    225,
    244.74,
    270,
    295.26,
    315,
    327.83,
    337.81,
    346.43,
    355.17,
]

document.querySelector("body").appendChild(canvas);

function draw_demo() {

    var ctx = document.querySelector("#game").getContext("2d");

    var sin = Math.sin(Math.PI / 6);
    var cos = Math.cos(Math.PI / 6);
    ctx.translate(100, 100);
    var c = 0;
    for (var i = 0; i <= 12; i++) {
        c = Math.floor(255 / 12 * i);
        ctx.fillStyle = 'rgb(' + c + ', ' + c + ', ' + c + ')';
        ctx.fillRect(0, 0, 100, 10);
        /**
         *   Transform
         *   | a c e |
         *   | b d f |
         *   | 0 0 1 |
         *   transformation matrix is described by 
         *   a( m11) Horizontal scaling
         *   b( m12) Horizontal skewing
         *   c( m21) Vertical skewing
         *   d( m22) vertical scaling
         *   e( dx) Horizontal moving
         *   f( dy) Vertiacal moving
         */
        ctx.transform(cos, sin, -sin, cos, 0, 0);
    }

    ctx.setTransform(-1, 0, 0, 1, 100, 100);
    ctx.fillStyle = 'rgba(255, 128, 255, 0.5)';
    ctx.fillRect(0, 50, 100, 100);
}

function draw_five() {
    var ctx = document.querySelector("#game").getContext("2d");
    var sin = Math.sin(Math.PI / 5);
    var cos = Math.cos(Math.PI / 5);
    ctx.save();
    ctx.beginPath();
    ctx.translate(150, 150);
    for (let i = 0; i < 10; i++) {
        ctx.transform(cos, sin, -sin, cos, 0, 0);
        if (i % 2 == 1) {
            ctx.lineTo(0, 40);
        } else {
            ctx.lineTo(0, 100);
        }
    }
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
}

function draw_seven(x, y, R) {
    var ctx = document.querySelector("#game").getContext("2d");
    ctx.save();
    ctx.translate(x, y);
    var sin = Math.sin(Math.PI / 7);
    var cos = Math.cos(Math.PI / 7);
    let l = R;
    let m = R * (54.609 / 100.00);

    ctx.beginPath();
    for (let i = 0; i < 14; i++) {
        ctx.transform(cos, sin, -sin, cos, 0, 0);
        if (i % 2 == 0) {
            ctx.lineTo(0, l);
        } else {
            ctx.lineTo(0, m);
        }
    }
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();
    ctx.restore();
}

function draw_seven(x, y, R, rotate) {
    var ctx = document.querySelector("#game").getContext("2d");
    ctx.save();
    ctx.translate(x, y);
    var sin = Math.sin(Math.PI / 7);
    var cos = Math.cos(Math.PI / 7);
    var sinP = Math.sin(rotate);
    var cosP = Math.cos(rotate);
    let l = R;
    let m = R * (54.609 / 100.00);
    ctx.transform(cosP, sinP, -sinP, cosP, 0, 0);
    ctx.beginPath();
    for (let i = 0; i < 14; i++) {
        ctx.transform(cos, sin, -sin, cos, 0, 0);
        if (i % 2 == 0) {
            ctx.lineTo(0, l);
        } else {
            ctx.lineTo(0, m);
        }
    }
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();
    ctx.restore();
}

function draw_rect(x0, y0, x1, y1) {
    var ctx = document.querySelector("#game").getContext("2d");
    ctx.rect(x0, y0, x1, y1);
    ctx.fillStyle = "blue";
    ctx.fill();
}

/** position x, y, semi majar a semi minor b , start diameter r, rotation degree **/
function draw_little_seven(x, y, a, b, r, phi) {
    var ctx = document.querySelector("#game").getContext("2d");
    var sin = Math.sin(Math.PI / 5);
    var cos = Math.cos(Math.PI / 5);
    ctx.save();
    ctx.translate(x, y);

    let x_ = a * Math.cos(phi);
    let y_ = b * Math.sin(phi);

    draw_seven(x_, y_, r, phi - Math.PI / 2);
    ctx.stroke();
    ctx.restore();
}

draw_rect(0, 0, B, A);
draw_seven(B / 2, A / 2, G / 2);

/** start from +x axis */
for (let i = 0; i < 26; i++) {
    let theta = pos_x[i] - 90;

    let a = major_axis / 2;
    let b = minor_axis / 2;
    let phi = Math.atan(Math.tan(degrees_to_radians(theta)) * (a / b));
    if (i > 13) {
        phi = phi + Math.PI;
    }
    draw_little_seven(B / 2, A / 2, a, b, H / 2, phi);
}
for (let i = 0; i < 26; i++) {
    let theta = pos_y[i] - 90;

    let b = major_axis / 2;
    let a = minor_axis / 2;
    let phi = Math.atan(Math.tan(degrees_to_radians(theta)) * (a / b));
    if (i > 12) {
        phi = phi + Math.PI;
    }
    draw_little_seven(B / 2, A / 2, a, b, H / 2, phi);
}

function degrees_to_radians(degrees) {
    var pi = Math.PI;
    return degrees * (pi / 180);
}


/**
 * ================================================== 
 */
var x = 0;

function draw_demo_animation() {
    var canvas = document.querySelector("#game");
    var ctx = document.querySelector("#game").getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(x, 100, 25, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();

    x = x + 1;
    if (x > canvas.width) x = 0;

    requestAnimationFrame(draw_demo_animation);
}

// draw_demo_animation();
var spaceship = {
    color: "grey",
    width: 8,
    height: 22,
    position: {
        x: 0,
        y: 0
    },
    angle: 0,
    engineOn: false,
    rotatingLeft: false,
    rotatingRight: false
}