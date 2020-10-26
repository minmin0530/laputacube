const RED     = 0xff0000;
const GREEN   = 0x00ff00;
const BLUE    = 0x0000ff;
const YELLOW  = 0xffff00;
const VIOLET  = 0xff00ff;
const CYAN    = 0x00ffff;
const WHITE   = 0xffffff;
const BLACK   = 0x000000;

class Cube {
    constructor(scene, x, y, z, color) {

        const cubeGeo = new THREE.BoxBufferGeometry(50, 50, 50);
        const cubeMaterial = new THREE.MeshLambertMaterial({ color: color });
        this.cubeMesh = new THREE.Mesh(cubeGeo, cubeMaterial);
        this.cubeMesh.position.set(x, y, z);
        scene.add(this.cubeMesh);
        if (color == BLACK) {
            const geometry = new THREE.BoxGeometry(50, 50, 50);
            const edges = new THREE.EdgesGeometry(geometry);
            this.lineMesh = new THREE.LineSegments( edges, new THREE.LineBasicMaterial({ color: WHITE }) );
            this.lineMesh.position.set(this.cubeMesh.position.x, this.cubeMesh.position.y, this.cubeMesh.position.z);
            scene.add(this.lineMesh);
        } else {
            const geometry = new THREE.BoxGeometry(50, 50, 50);
            const edges = new THREE.EdgesGeometry(geometry);
            this.lineMesh = new THREE.LineSegments( edges, new THREE.LineBasicMaterial({ color: BLACK }) );
            this.lineMesh.position.set(this.cubeMesh.position.x, this.cubeMesh.position.y, this.cubeMesh.position.z);
            scene.add(this.lineMesh);
        }
    }
    setColor(color) {
        this.cubeMesh.material.color.setHex(color);
        this.lineMesh.material.color.setHex(BLACK);
    }
}