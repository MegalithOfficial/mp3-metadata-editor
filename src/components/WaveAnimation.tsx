import { useEffect, useRef } from "react";
import * as THREE from "three";
import N from "noisejs"; 

interface WaveParams {
  mesh: THREE.Mesh;
  speed: number;
  amplitude: number;
  thicknessFactor: number;
}

const WaveAnimation = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const mount = mountRef.current;
    const seed = Date.now() + Math.random();

    //eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const noise = new N.Noise(seed); 

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 15; 

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    const getRandomWaveParams = () => {
      return {
        speed: Math.random() * 0.0005 + 0.0001, 
        amplitude: Math.random() * 1.2 + 0.5,   
        thicknessFactor: Math.random() * 0.5 + 0.3, 
      };
    };

    const createWave = (color: THREE.Color, positionY: number) => {
      const geometry = new THREE.PlaneGeometry(20, 2, 100, 20); 
      const material = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.7,
        side: THREE.DoubleSide,
        wireframe: true,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.y = positionY;
      scene.add(mesh);

      const waveParams = getRandomWaveParams();
      return { mesh, ...waveParams };
    };

    const wave1 = createWave(new THREE.Color("rgb(58, 123, 253)"), 0);
    const wave2 = createWave(new THREE.Color("rgb(252, 70, 107)"), 0);
    const wave3 = createWave(new THREE.Color("rgb(131, 58, 180)"), 0);
    const wave4 = createWave(new THREE.Color("rgb(255, 165, 0)"), 0);
    const wave5 = createWave(new THREE.Color("rgb(209, 134, 209)"), 0);
    
    const waves = [wave1, wave2, wave3, wave4, wave5];

    const animateWaves = (
      { mesh, speed, amplitude, thicknessFactor }: WaveParams,
      timeOffset: number
    ) => {
      const time = Date.now() * speed + timeOffset; 

      for (let i = 0; i < mesh.geometry.attributes.position.count; i++) {
        const x = mesh.geometry.attributes.position.getX(i);

        const waveHeight = Math.sin(x * 0.3 + time) * amplitude; 
        const thicknessNoise = noise.simplex2(x * 0.05, time * 0.5) * thicknessFactor;
        mesh.geometry.attributes.position.setY(i, waveHeight);
        mesh.geometry.attributes.position.setZ(i, thicknessNoise);
      }
      mesh.geometry.attributes.position.needsUpdate = true;
    };

    const animate = () => {
      requestAnimationFrame(animate);

      waves.forEach((wave, index) => animateWaves(wave as unknown as WaveParams, index));
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100vh" }} />;
};

export default WaveAnimation;
