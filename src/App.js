import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { Box, softShadows, MeshWobbleMaterial, OrbitControls } from "drei";
import "./App.scss";
import { motion } from "framer-motion";
import { useSpring, a } from "react-spring/three";

softShadows();

const Spinner = ({ position, color, speed, args }) => {
  const mesh = useRef();
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
  const props = useSpring({ opacity: 1, from: { opacity: 0 } });
  return (
    <a.mesh position={position} ref={mesh} castShadow>
      <boxBufferGeometry attach='geometry' args={args} />
      <MeshWobbleMaterial
        color={color}
        speed={speed}
        attach='material'
        factor={0.6} // Strength, 0 disables the effect (default=1)
        // Speed (default=1)
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
    <motion.header
      initial={{ opacity: 0, y: 72 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ease: [0.6, -0.01, 0.05, 0.9], duration: 0.6 }}>
      <div className='logo'>
        <span>REACT THREE FIBER</span>
      </div>
      <div className='title'>
        <span>Learning how to use react three fiber.</span>
      </div>
      <div className='episode'>
        <span>EP. 1</span>
      </div>
    </motion.header>
  );
};

const App = () => {
  return (
    <>
      <Header />
      <Canvas
        colorManagement
        shadowMap
        camera={{ position: [-5, 2, 10], fov: 60 }}>
        <fog attach='fog' args={["white", 0, 40]} />
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
        <pointLight position={[-10, 0, -20]} color='#5f5ab5' intensity={1} />
        <pointLight position={[0, -10, 0]} intensity={1.5} />
        <group position={[0, 0, 0]}>
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -3, 0]}
            receiveShadow>
            <planeBufferGeometry attach='geometry' args={[100, 100]} />
            <shadowMaterial attach='material' opacity={0.3} />
          </mesh>
          <Spinner
            position={[0, 1, 0]}
            color='lightblue'
            args={[3, 2, 1]}
            speed={2}
          />
          <Spinner position={[-2, 1, -5]} color='pink' speed={6} />
          <Spinner position={[5, 1, -2]} color='pink' speed={6} />
        </group>
        <OrbitControls />
      </Canvas>
    </>
  );
};

export default App;
