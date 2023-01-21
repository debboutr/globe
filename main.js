import * as THREE from 'three';
import gsap from 'gsap';
import vertexShader from "./shaders/vertex.glsl"
import fragmentShader from "./shaders/fragment.glsl"
import atmosphereVertexShader from "./shaders/atmosphereVertex.glsl"
import atmosphereFragmentShader from "./shaders/atmosphereFragment.glsl"
// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)

document.body.appendChild(renderer.domElement)

const sphere = new THREE.Mesh( new THREE.SphereGeometry(5, 50, 50),
    new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
            globeTexture: {
                value: new THREE.TextureLoader().load('./img/globe_bigger.jpg')
            }
        }
    }))

//console.log(sphere)
sphere.rotateY(-1.3752458)

const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(5, 50, 50),
    new THREE.ShaderMaterial({
        vertexShader: atmosphereVertexShader,
        fragmentShader: atmosphereFragmentShader,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide
    })
)


atmosphere.scale.set(1.1, 1.1, 1.1)
scene.add(atmosphere)

const group = new THREE.Group()
group.add(sphere)
scene.add(group)

//camera.position.x = -15
//camera.position.y = 5
camera.position.z = 25


const mouse = {
    x: 0, // undefined makes the sphere not show up til i move mouse
    y: 0
}

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
  sphere.rotation.y += 0.003
  gsap.to(group.rotation, {
      x: -mouse.y * 0.5,
      y: mouse.x * 0.5,
      duration: 2
  })
}

animate();

addEventListener('mousemove', () => {
    mouse.x = (event.clientX / innerWidth) * 2 - 1
    mouse.y = (event.clientY / innerHeight) * 2 - 1
    //console.log(mouse)
})
