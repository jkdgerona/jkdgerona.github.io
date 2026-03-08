/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import './UnderWater.css';

// --- BACKGROUND SHADERS ---

const waterVertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const waterFragmentShader = `
varying vec2 vUv;
uniform float uTime;

// 2D Random & Noise functions for water cloudiness
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

// Fractal Brownian Motion for swirling water shapes
float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 4; i++) {
        value += amplitude * noise(st);
        st *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

void main() {
  vec2 uv = vUv;

  // Base Colors
  vec3 brightCyan = vec3(0.18, 0.81, 0.82); // #2ECED0 (Top Left)
  vec3 mediumTeal = vec3(0.12, 0.45, 0.55); // Middle transition
  vec3 deepBlue   = vec3(0.04, 0.18, 0.28); // #082F47 (Bottom Right)

  // Gradient Mapping (Diagonal from top-left to bottom-right)
  float diagonal = (uv.y + (1.0 - uv.x)) * 0.5;
  
  // Create slow, organic water distortion
  vec2 noiseUv = uv * 3.0;
  noiseUv.y -= uTime * 0.05; // Water slowly drifting up
  noiseUv.x += sin(uTime * 0.02) * 0.5;
  float waterDistortion = fbm(noiseUv) * 0.3;

  // Blend colors based on diagonal gradient + distortion
  float mixVal = clamp(diagonal + waterDistortion, 0.0, 1.0);
  
  vec3 color;
  if (mixVal > 0.5) {
      color = mix(mediumTeal, brightCyan, (mixVal - 0.5) * 2.0);
  } else {
      color = mix(deepBlue, mediumTeal, mixVal * 2.0);
  }

  // Soft light rays from top left
  vec2 rayUv = uv - vec2(0.0, 1.0);
  float angle = atan(rayUv.y, rayUv.x);
  float rays = sin(angle * 8.0 + uTime * 0.1) * 0.5 + 0.5;
  rays *= noise(vec2(angle * 4.0, uTime * 0.05));
  
  // Add volumetric haze glow
  float glow = max(0.0, 1.0 - distance(uv, vec2(0.0, 1.0)) * 1.5);
  
  color += (rays * 0.15 + glow * 0.2) * brightCyan;

  gl_FragColor = vec4(color, 1.0);
}
`;

// --- PARTICLE SHADERS ---

const particleVertexShader = `
uniform float uTime;
varying float vAlpha;

void main() {
  vec3 pos = position;

  // Slow upward drift
  pos.y += uTime * 0.2;
  
  // Subtle horizontal sway based on depth and time
  pos.x += sin(uTime * 0.5 + pos.y * 2.0) * 0.1;
  
  // Wrap particles around so they loop endlessly vertically
  pos.y = mod(pos.y + 10.0, 20.0) - 10.0;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;

  // Size attenuation based on depth (creates parallax scale)
  gl_PointSize = (20.0 / -mvPosition.z);

  // Calculate density/alpha based on position (denser/brighter in darker bottom-right)
  // Fade out as they get closer to the bright top-left
  float depthFade = clamp((mvPosition.z + 10.0) / 10.0, 0.1, 1.0);
  float posFade = clamp((1.0 - pos.y * 0.1) - (1.0 + pos.x * 0.1), 0.2, 1.0);
  
  // Opacity flicker
  float flicker = 0.6 + 0.4 * sin(uTime * 2.0 + pos.x * 10.0);
  
  vAlpha = depthFade * posFade * flicker;
}
`;

const particleFragmentShader = `
varying float vAlpha;

void main() {
  // Create a soft-edged circle for the particle
  vec2 coord = gl_PointCoord - vec2(0.5);
  float dist = length(coord);
  
  if (dist > 0.5) discard;
  
  // Soft blur on the edges
  float alpha = smoothstep(0.5, 0.1, dist) * vAlpha;
  
  // Tiny white/cyan specks
  gl_FragColor = vec4(0.8, 0.95, 1.0, alpha * 0.7);
}
`;

// --- COMPONENTS ---

const BackgroundPlane = () => {
  const meshRef = useRef();
  const { viewport } = useThree();

  const uniforms = useMemo(() => ({
    uTime: { value: 0 }
  }), []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]} position={[0, 0, -5]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={waterVertexShader}
        fragmentShader={waterFragmentShader}
        depthWrite={false}
      />
    </mesh>
  );
};

const Particles = ({ count = 1500 }) => {
  const pointsRef = useRef();

  // Generate random initial positions for particles
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;     // x (-10 to 10)
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20; // y (-10 to 10)
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // z (-5 to 5)
    }
    return positions;
  }, [count]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 }
  }), []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.material.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const UnderWater = () => {
  return (
    <div className="underwater-container">
      <Canvas 
        dpr={[1, 2]} 
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent', pointerEvents: 'none' }}
      >
        <Particles count={25000} />
      </Canvas>
    </div>
  );
};

export default UnderWater;