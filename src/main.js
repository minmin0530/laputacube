class Main {
    constructor() {
        this.camera = {};
        this.scene = {};
        this.controls = {};
        this.renderer = {};
        this.plane = {};
        this.mouse = {};
        this.raycaster = {};
        this.isShiftDown = false;
    
        this.rollOverMesh = {};
        this.rollOverMaterial = {};
        this.cubeGeo = {};
        this.cubeMaterial = [];
        this.materialIndex = 0;

        this.lineBox = [];
        this.objects = [];
        this.objectsMaterial = [];
        this.contents = '';
        this.form = {};
        this.anglePutFlag = false;
        this.colorChangeFlag = false;
        this.cameraAngle = 0.0;
        this.cameraZoom = 700.0;

        // シーンを作成
        this.scene = new THREE.Scene();
        // カメラを作成
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
        this.camera.position.set(this.cameraZoom * Math.sin(Math.PI / 180.0 * this.cameraAngle), -this.cameraZoom/4, this.cameraZoom * Math.cos(Math.PI / 180.0 * this.cameraAngle));
        this.camera.lookAt(0, 0, 0);

        // var rollOverGeo = new THREE.BoxBufferGeometry(50, 50, 50);
        // this.rollOverMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, opacity: 0.5, transparent: true });
        // this.rollOverMesh = new THREE.Mesh(rollOverGeo, this.rollOverMaterial);
        // this.scene.add(this.rollOverMesh);


        this.RANDOM_NUM = 100;
        this.randomArray = [];
        this.randomSpeedArray = [];
        for (let i = 0; i < this.RANDOM_NUM; ++i) {
            this.randomArray.push( Math.floor(Math.random() * 1600) );
            this.randomSpeedArray.push( Math.random() * 5.0 );
        }

        const CUBE_NUM = 20;
        this.cubeArray = [];

        const colorArray = [BLACK, BLACK, BLACK, BLACK, BLACK, BLACK, BLACK, BLACK];
        const colorRandomArray = [RED, GREEN, BLUE, YELLOW, VIOLET, CYAN, WHITE, BLACK];

        for (let x = -CUBE_NUM; x < CUBE_NUM; ++x) {
            for (let y = -CUBE_NUM; y < CUBE_NUM; ++y) {
                this.cubeArray.push( new Cube(this.scene, x * 50.0, y * 50.0, CUBE_NUM * 50.0, colorArray[Math.floor(Math.random() * 8)]) );
            }
        }
        for (let x = -CUBE_NUM; x < CUBE_NUM; ++x) {
            for (let y = -CUBE_NUM; y < CUBE_NUM; ++y) {
                this.cubeArray.push( this.cube = new Cube(this.scene, x * 50, y * 50, -CUBE_NUM * 50.0, colorArray[Math.floor(Math.random() * 8)]) );
            }
        }

        for (let y = -CUBE_NUM; y < CUBE_NUM; ++y) {
            for (let z = -CUBE_NUM; z < CUBE_NUM; ++z) {
                this.cubeArray.push( this.cube = new Cube(this.scene, CUBE_NUM * 50, y * 50, z * 50.0, colorArray[Math.floor(Math.random() * 8)]) );
            }
        }

        for (let y = -CUBE_NUM; y < CUBE_NUM; ++y) {
            for (let z = -CUBE_NUM; z < CUBE_NUM; ++z) {
                this.cubeArray.push( this.cube = new Cube(this.scene, -CUBE_NUM * 50, y * 50, z * 50.0, colorArray[Math.floor(Math.random() * 8)]) );
            }
        }

        for (let x = -CUBE_NUM; x < CUBE_NUM; ++x) {
            for (let z = -CUBE_NUM; z < CUBE_NUM; ++z) {
                this.cubeArray.push( this.cube = new Cube(this.scene, x * 50.0, CUBE_NUM * 50.0, z * 50.0, colorArray[Math.floor(Math.random() * 8)]) );
            }
        }
        for (let x = -CUBE_NUM; x < CUBE_NUM; ++x) {
            for (let z = -CUBE_NUM; z < CUBE_NUM; ++z) {
                this.cubeArray.push( this.cube = new Cube(this.scene, x * 50, -CUBE_NUM * 50, z * 50.0, colorArray[Math.floor(Math.random() * 8)]) );
            }
        }

        // for (let i = 0; i < this.RANDOM_NUM; ++i) {
        //     this.cubeArray[0 + this.randomArray[i]].setColor(colorRandomArray[Math.floor(Math.random() * 8)]);
        //     this.cubeArray[1600 + this.randomArray[i]].setColor(colorRandomArray[Math.floor(Math.random() * 8)]);
        //     this.cubeArray[3200 + this.randomArray[i]].setColor(colorRandomArray[Math.floor(Math.random() * 8)]);
        //     this.cubeArray[4800 + this.randomArray[i]].setColor(colorRandomArray[Math.floor(Math.random() * 8)]);
        //     this.cubeArray[6400 + this.randomArray[i]].setColor(colorRandomArray[Math.floor(Math.random() * 8)]);
        //     this.cubeArray[8000 + this.randomArray[i]].setColor(colorRandomArray[Math.floor(Math.random() * 8)]);

        // }


        // this.cubeGeo = new THREE.BoxBufferGeometry(50, 50, 50);
        // for (let l = 0; l < 16; ++l) {
        // this.cubeMaterial.push(new THREE.MeshLambertMaterial({ color: 0xfeb74c }));
        // }

        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
                    
        // var gridHelper = new THREE.GridHelper(2500, 50);
        // this.scene.add(gridHelper);

        var geometry = new THREE.PlaneBufferGeometry(2500, 2500);
        geometry.rotateX(- Math.PI / 2);

        this.plane = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ visible: false }));
        this.scene.add(this.plane);

        this.objects.push(this.plane);

        var ambientLight = new THREE.AmbientLight(0x606060);
        this.scene.add(ambientLight);

        var directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(1, 0.75, 0.5).normalize();
        this.scene.add(directionalLight);

        var directionalLight2 = new THREE.DirectionalLight(0xffffff);
        directionalLight2.position.set(-1, 0.75, -0.5).normalize();
        this.scene.add(directionalLight2);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);

        // document.addEventListener('mousemove', event => this.onDocumentMouseMove(event), false);
        // document.addEventListener('mousedown', event => this.onDocumentMouseDown(event), false);
        // document.addEventListener('keydown', event => this.onDocumentKeyDown(event), false);
        // document.addEventListener('keyup', event => this.onDocumentKeyUp(event), false);
        // document.addEventListener( 'scroll', onDocumentScroll, false );

        window.addEventListener('resize', event => this.onWindowResize(event), false);

        this.renderer.setClearColor("#aaaaaa", 1.0);
    
        this.loop();
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
    
        this.renderer.setSize(window.innerWidth, window.innerHeight);    
    }

    render() {
        this.renderer.setClearColor("#aaaaaa", 1.0);
        this.renderer.render(this.scene, this.camera);
    }
    
    loop() {
        for (let i = 0; i < this.RANDOM_NUM; ++i) {
            this.cubeArray[0 + this.randomArray[i]].cubeMesh.position.z -= this.randomSpeedArray[i];
            this.cubeArray[0 + this.randomArray[i]].lineMesh.position.z -= this.randomSpeedArray[i];

            this.cubeArray[1600 + this.randomArray[i]].cubeMesh.position.z += this.randomSpeedArray[i];
            this.cubeArray[1600 + this.randomArray[i]].lineMesh.position.z += this.randomSpeedArray[i];

            this.cubeArray[3200 + this.randomArray[i]].cubeMesh.position.x -= this.randomSpeedArray[i];
            this.cubeArray[3200 + this.randomArray[i]].lineMesh.position.x -= this.randomSpeedArray[i];

            this.cubeArray[4800 + this.randomArray[i]].cubeMesh.position.x += this.randomSpeedArray[i];
            this.cubeArray[4800 + this.randomArray[i]].lineMesh.position.x += this.randomSpeedArray[i];

            this.cubeArray[6400 + this.randomArray[i]].cubeMesh.position.y -= this.randomSpeedArray[i];
            this.cubeArray[6400 + this.randomArray[i]].lineMesh.position.y -= this.randomSpeedArray[i];

            this.cubeArray[8000 + this.randomArray[i]].cubeMesh.position.y += this.randomSpeedArray[i];
            this.cubeArray[8000 + this.randomArray[i]].lineMesh.position.y += this.randomSpeedArray[i];


        }

        
        this.render();
        var self = this;
        requestAnimationFrame(function(){ self.loop(); });
    }
}