print = console.log;
const width = window.innerWidth * 0.8;
const height = window.innerHeight * 0.8;

var points = [];
var lines = [];
const r = 15;

var camera4d = [parseFloat(document.getElementById("x").value), parseFloat(document.getElementById("y").value), parseFloat(document.getElementById("z").value), parseFloat(document.getElementById("w").value), 1];
var alpha = parseFloat(document.getElementById("alpha").value);
var beta = parseFloat(document.getElementById("beta").value);
var gamma = parseFloat(document.getElementById("gamma").value);
var delta = parseFloat(document.getElementById("delta").value);
var epsilon = parseFloat(document.getElementById("epsilon").value);
var zeta = parseFloat(document.getElementById("zeta").value);

var f = parseFloat(document.getElementById("f").value);

var rxy = parseFloat(document.getElementById("rxy").value);
var rxz = parseFloat(document.getElementById("rxz").value);
var ryz = parseFloat(document.getElementById("ryz").value);
var rxw = parseFloat(document.getElementById("rxw").value);
var ryw = parseFloat(document.getElementById("ryw").value);
var rzw = parseFloat(document.getElementById("rzw").value);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor("#b0b0b0");
renderer.setSize(width, height);
document.getElementById("canvas").appendChild(renderer.domElement);

{
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
}

var render = function() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

render();

const sphereGeometry = new THREE.SphereGeometry(5, 10, 10);

camera.position.z = 400;
camera.position.x = 0;
camera.position.y = 0;

function makeInstance(geometry, color, x, y, z) {
    material = new THREE.MeshPhongMaterial({ color });

    sphere = new THREE.Mesh(sphereGeometry, material);
    scene.add(sphere);
    sphere.position.x = x;
    sphere.position.y = y;
    sphere.position.z = z;
    return sphere;
}

function makeLine(x1, y1, z1, x2, y2, z2, color = 0x000000) {
    material = new THREE.LineBasicMaterial(color);
    verticies = [];
    verticies.push(new THREE.Vector3(x1, y1, z1));
    verticies.push(new THREE.Vector3(x2, y2, z2));
    geometry = new THREE.BufferGeometry().setFromPoints(verticies);
    line = new THREE.Line(geometry, material);
    scene.add(line);
    return line;
}

class Point {
    constructor(list, pos, radius, color = "black") {
        this.list = list;
        this.pos = pos;
        this.projected = [0, 0, 0];
        this.color = color;
        this.radius = radius;
        this.list.push(this);
        this.circ = makeInstance(sphereGeometry, 0x44aa88, new THREE.Vector3(this.projected[1], this.projected[2], this.projected[3]))
    }
    draw() {

        this.circ.position.x = this.projected[0];
        this.circ.position.y = this.projected[1];
        this.circ.position.z = this.projected[2];
    }
}

class Line {
    constructor(list, v1, v2, color = "black") {
        this.list = list;
        this.p1 = v1;
        this.p2 = v2;
        this.color = color;
        this.line = makeLine(this.p1.projected[0], this.p1.projected[1], this.p1.projected[2], this.p2.projected[0], this.p2.projected[1], this.p2.projected[2]);
        this.list.push(this);

    }
    draw() {
        this.line.geometry.dispose();
        scene.remove(this.line);
        this.line = makeLine(this.p1.projected[0], this.p1.projected[1], this.p1.projected[2], this.p2.projected[0], this.p2.projected[1], this.p2.projected[2]);

    }
}

function generateTesseract(x, y, z, w, s) {
    d = s / 2
    p1 = new Point(points, [x - d, y - d, z - d, w - d, 1], r);
    p2 = new Point(points, [x + d, y - d, z - d, w - d, 1], r);
    p3 = new Point(points, [x - d, y + d, z - d, w - d, 1], r);
    p4 = new Point(points, [x - d, y - d, z + d, w - d, 1], r);
    p5 = new Point(points, [x - d, y - d, z - d, w + d, 1], r);
    p6 = new Point(points, [x + d, y + d, z - d, w - d, 1], r);
    p7 = new Point(points, [x + d, y - d, z + d, w - d, 1], r);
    p8 = new Point(points, [x + d, y - d, z - d, w + d, 1], r);
    p9 = new Point(points, [x - d, y + d, z - d, w + d, 1], r);
    p10 = new Point(points, [x - d, y - d, z + d, w + d, 1], r);
    p11 = new Point(points, [x + d, y + d, z + d, w - d, 1], r);
    p12 = new Point(points, [x + d, y - d, z + d, w + d, 1], r);
    p13 = new Point(points, [x + d, y + d, z + d, w + d, 1], r);
    p14 = new Point(points, [x - d, y + d, z + d, w + d, 1], r);
    p15 = new Point(points, [x + d, y + d, z - d, w + d, 1], r);
    p16 = new Point(points, [x - d, y + d, z + d, w - d, 1], r);

    new Line(lines, p1, p2);
    new Line(lines, p1, p3);
    new Line(lines, p1, p4);
    new Line(lines, p1, p5);
    new Line(lines, p2, p6);
    new Line(lines, p2, p7);
    new Line(lines, p2, p8);
    new Line(lines, p3, p9);
    new Line(lines, p3, p6);
    new Line(lines, p3, p16);
    new Line(lines, p4, p7);
    new Line(lines, p4, p16);
    new Line(lines, p4, p10);
    new Line(lines, p5, p10);
    new Line(lines, p5, p9);
    new Line(lines, p5, p8);
    new Line(lines, p6, p11);
    new Line(lines, p6, p15);
    new Line(lines, p7, p11);
    new Line(lines, p7, p12);
    new Line(lines, p8, p12);
    new Line(lines, p8, p15);
    new Line(lines, p9, p14);
    new Line(lines, p9, p15);
    new Line(lines, p10, p14);
    new Line(lines, p10, p12);
    new Line(lines, p11, p13);
    new Line(lines, p11, p16);
    new Line(lines, p12, p13);
    new Line(lines, p13, p14);
    new Line(lines, p14, p16);
    new Line(lines, p15, p13);
}

generateTesseract(0, 0, 0, 0, 200);

print(lines)

function rotationXY(x) {
    return [
        [Math.cos(x), Math.sin(x), 0, 0, 0],
        [-Math.sin(x), Math.cos(x), 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 1, 0],
        [0, 0, 0, 0, 1]
    ]
}

function rotationXZ(x) {
    return [
        [Math.cos(x), 0, Math.sin(x), 0, 0],
        [0, 1, 0, 0, 0],
        [-Math.sin(x), 0, Math.cos(x), 0, 0],
        [0, 0, 0, 1, 0],
        [0, 0, 0, 0, 1]
    ]
}

function rotationYZ(x) {
    return [
        [1, 0, 0, 0, 0],
        [0, Math.cos(x), Math.sin(x), 0, 0],
        [0, -Math.sin(x), Math.cos(x), 0, 0],
        [0, 0, 0, 1, 0],
        [0, 0, 0, 0, 1]
    ]
}

function rotationXW(x) {
    return [
        [Math.cos(x), 0, 0, -Math.sin(x), 0],
        [0, 1, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [Math.sin(x), 0, 0, Math.cos(x), 0],
        [0, 0, 0, 0, 1]
    ]
}

function rotationYW(x) {
    return [
        [1, 0, 0, 0, 0],
        [0, Math.cos(x), 0, -Math.sin(x), 0],
        [0, 0, 1, 0, 0],
        [0, Math.sin(x), 0, Math.cos(x), 0],
        [0, 0, 0, 0, 1]
    ];
}

function rotationZW(x) {
    return [
        [1, 0, 0, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 0, Math.cos(x), -Math.sin(x), 0],
        [0, 0, Math.sin(x), Math.cos(x), 0],
        [0, 0, 0, 0, 1]
    ]
}

function rotation(p, r1 = 0, r2 = 0, r3 = 0, r4 = 0, r5 = 0, r6 = 0) {
    p.pos = math.multiply(p.pos, rotationXY(r1));
    p.pos = math.multiply(p.pos, rotationXZ(r2));
    p.pos = math.multiply(p.pos, rotationYZ(r3));
    p.pos = math.multiply(p.pos, rotationXW(r4));
    p.pos = math.multiply(p.pos, rotationYW(r5));
    p.pos = math.multiply(p.pos, rotationZW(r6));
}

function project() {
    translationMatrix = [
        [1, 0, 0, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 1, 0],
        [-camera4d[0], -camera4d[1], -camera4d[2], -camera4d[3], 1]
    ];

    rotationMatrixXY = rotationXY(-alpha);
    rotationMatrixXZ = rotationXZ(-beta);
    rotationMatrixYZ = rotationYZ(-gamma);
    rotationMatrixXW = rotationXW(-delta);
    rotationMatrixYW = rotationYW(-epsilon);
    rotationMatrixZW = rotationZW(-zeta);

    transformationMatrix = math.multiply(translationMatrix, rotationMatrixXY, rotationMatrixXZ, rotationMatrixYZ, rotationMatrixXW, rotationMatrixYW, rotationMatrixZW);

    for (let p of points) {

        rotation(p, rxy, rxz, ryz, rxw, ryw, rzw)
        bruh = math.multiply(p.pos, transformationMatrix);
        w = bruh[3] - camera4d[3];

        projectionMatrix = [
            [f / (w), 0, 0, 0, 0],
            [0, f / (w), 0, 0, 0],
            [0, 0, f / (w), 0, 0],
            [0, 0, 0, f / (w), 0],
            [0, 0, 0, -f, 1]
        ];

        projected = math.multiply(bruh, projectionMatrix);

        p.projected = [projected[0], projected[1], projected[2]];

        p.draw();
    }

    for (l of lines) {
        l.draw();
    }
}

function count() {
    var numOfMeshes = 0;
    scene.traverse(function(obj) {
        numOfMeshes++;
    });
    return numOfMeshes;
}

function update(slider) {
    camera4d = [parseFloat(document.getElementById("x").value), parseFloat(document.getElementById("y").value), parseFloat(document.getElementById("z").value), parseFloat(document.getElementById("w").value), 1];
    alpha = parseFloat(document.getElementById("alpha").value);
    beta = parseFloat(document.getElementById("beta").value);
    gamma = parseFloat(document.getElementById("gamma").value);
    delta = parseFloat(document.getElementById("delta").value);
    epsilon = parseFloat(document.getElementById("epsilon").value);
    zeta = parseFloat(document.getElementById("zeta").value);

    f = parseFloat(document.getElementById("f").value);

    rxy = parseFloat(document.getElementById("rxy").value);
    rxz = parseFloat(document.getElementById("rxz").value);
    ryz = parseFloat(document.getElementById("ryz").value);
    rxw = parseFloat(document.getElementById("rxw").value);
    ryw = parseFloat(document.getElementById("ryw").value);
    rzw = parseFloat(document.getElementById("rzw").value);

    project();
    if (slider) {
        slider.nextElementSibling.value = slider.value;
    }

}

update();

function animate() {
    requestAnimationFrame(animate);
    project();
}
animate();