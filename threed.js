const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.getElementById('scene-container').appendChild(renderer.domElement);
let mixer; 
let model;

const loader = new THREE.GLTFLoader();
loader.load('./model.glb', (gltf) => {
  model = gltf.scene;
  scene.add(model);

  // Set initial rotation to rotate slightly to the left
//   model.rotation.set(45,45,45)
model.position.set(0,-2,2)


  mixer = new THREE.AnimationMixer(model);

  const animations = gltf.animations;

  animations.forEach((clip) => {
    mixer.clipAction(clip).play();
  });
  setupAnimations();
});

// Add lights or other elements to the scene as needed
const pointLight1 = new THREE.PointLight(0xffffff, 1);
pointLight1.position.set(5, 5, 0);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0xffffff, 1);
pointLight2.position.set(-5, -5, 0);
scene.add(pointLight2);

const pointLight3 = new THREE.PointLight(0xffffff, 1);
pointLight3.position.set(5, -5, 0);
scene.add(pointLight3);

const pointLight4 = new THREE.PointLight(0xffffff, 1);
pointLight4.position.set(-5, 5, 0);
scene.add(pointLight4);

const pointLight5 = new THREE.PointLight(0xffffff, 1);
pointLight5.position.set(0, 0, 5);
scene.add(pointLight5);

const pointLight6 = new THREE.PointLight(0xffffff, 1);
pointLight6.position.set(0, 0, -5);
scene.add(pointLight6);

function setupAnimations() {
    const section1 = document.getElementById('section1');
    const section2 = document.getElementById('section2');
    const section3 = document.getElementById('section3');
    const section4 = document.getElementById('section4');
    const section5 = document.getElementById('section5');

  
    // Use GSAP to create a timeline
    const tl = gsap.timeline({ paused: true });
    const t2 = gsap.timeline({ paused: true });
    const t3 = gsap.timeline({ paused: true });
    const t4 = gsap.timeline({ paused: true });
  
    // Add animation to move the model to the left
    tl.to(model.position, { duration: 1, x: 2,y:-1,z:2 });
    t2.to(model.position, { duration: 1, x: -1,y:-1,z:3 });
    t3.to(model.position, { duration: 1, x: 0,y:-2,z:3 });
    t4.to(model.position, { duration: 1, x: -1,y:-1,z:3 });
    t4.to(model.rotation, { duration: 1, x: 0, y: 2, z: 0  ,ease: 'Power2.easeInOut' }, 0);
  
    ScrollTrigger.create({
        trigger: section2,
        start: 'top center',
        end: 'bottom bottom',
        onUpdate: (self) => {
          tl.progress(self.progress);
        },
      });
    ScrollTrigger.create({
        trigger: section3,
        start: 'top center',
        end: 'bottom bottom',
        onUpdate: (self) => {
          t2.progress(self.progress);
        },
      });
    ScrollTrigger.create({
        trigger: section4,
        start: 'top center',
        end: 'bottom bottom',
        onUpdate: (self) => {
          t3.progress(self.progress);
        },
      });
    ScrollTrigger.create({
        trigger: section5,
        start: 'top center',
        end: 'bottom bottom',
        onUpdate: (self) => {
          t4.progress(self.progress);
        },
      });

    }


  
const animate = () => {
  requestAnimationFrame(animate);

  if (mixer) {
    mixer.update(0.01);
  }
  renderer.render(scene, camera);
  ScrollTrigger.update(); 
};

animate();