import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { softShadows, MeshWobbleMaterial, OrbitControls } from "drei";
import "./App.scss";
import { useSpring, a } from "react-spring/three";

// soft Shadows
softShadows();

const Spinner = ({ position, color, speed, args }) => {
  const mesh = useRef();
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const props = useSpring({
    scale: active ? [1.5, 1.5, 1.5] : [1, 1, 1],
    color: hovered ? "hotpink" : "gray"
  });

  // const props = useSpring({ opacity: 1, from: { opacity: 0 } });
  return (
    <a.mesh
      position={position}
      ref={mesh}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setActive(!active)}
      scale={props.scale}
      castShadow
    >
      <boxBufferGeometry attach="geometry" args={args} />
      <MeshWobbleMaterial
        color={color}
        speed={speed}
        attach="material"
        factor={0.6}
      />
    </a.mesh>

    // <Box {...props} ref={mesh} castShadow>
    //   <MeshWobbleMaterial
    //     {...props}
    //     attach='material'
    //     factor={0.6} // Strength, 0 disables the effect (default=1)
    //     // Speed (default=1)
    //   />
    // </Box>
  );
};

const Header = () => {
  return (
    <header>
      <div className="logo">
        <span>REACT THREE FIBER</span>
      </div>
      <div className="title">
        <span>Learning how to use react three fiber.</span>
      </div>
      <div className="episode">
        <span>EP. 1</span>
      </div>
    </header>
  );
};

const App = () => {
  return (
    <>
      <Header />
      <Canvas
        colorManagement
        shadowMap
        camera={{ position: [-5, 2, 10], fov: 60 }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight
          castShadow
          position={[0, 10, 0]}
          intensity={1.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-10, 0, -20]} intensity={0.5} />
        <pointLight position={[0, -10, 0]} intensity={1.5} />
        <group>
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -3, 0]}
            receiveShadow
          >
            <planeBufferGeometry attach="geometry" args={[100, 100]} />
            <shadowMaterial attach="material" opacity={0.3} />
          </mesh>
          <Spinner
            position={[0, 1, 0]}
            color="lightblue"
            args={[3, 2, 1]}
            speed={2}
          />
          <Spinner position={[-2, 1, -5]} color="pink" speed={6} />
          <Spinner position={[5, 1, -2]} color="pink" speed={6} />
        </group>
        <OrbitControls />
      </Canvas>
    </>
  );
};

export default App;
