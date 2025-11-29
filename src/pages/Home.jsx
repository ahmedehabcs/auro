import React, { useState, Suspense, lazy } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Environment } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";

// Lazy load components
const ArgonModel = lazy(() => import("../components/Home/ArgonModel.jsx"));
const Road = lazy(() => import("../components/Home/InversedRoad.jsx"));
const InversedRoad = lazy(() => import("../components/Home/Road.jsx"));
const RotatingStars = lazy(() => import("../components/Home/RotatingStars.jsx"));
const HomeText = lazy(() => import("../components/Home/HomeText.jsx"));
const TopIcons = lazy(() => import("../components/Home/TopIcons.jsx"));
const HomeCardHolder = lazy(() => import("../components/Home/HomeCardHolder.jsx"));

export default function Viewer() {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 767px)" });
  const [isFullscreen, setIsFullscreen] = useState(false);

  const camProps = {
    position: [isSmallScreen ? -60 : -120, 40, -240],
    fov: 30
  };

  return (
    <section className="h-[200vh] relative w-screen overflow-auto bg-radial-gradient-dark">
      <div className="h-screen relative">
        <Canvas
          shadows
          camera={camProps}
          gl={{ antialias: true }}
          className="absolute top-0 left-0 w-full h-full z-0"
        >
          <Suspense fallback={null}>
            <RotatingStars count={2500} />
            <Float
              speed={2}
              rotationIntensity={0}
              floatIntensity={0.5}
              position={isSmallScreen ? [0, 0, 0] : [-20, 0, 0]}
            >
              <ArgonModel zPosition={-20} />
              <Road />
              <InversedRoad />
            </Float>
            <OrbitControls
              enableZoom={isFullscreen}
              enablePan={isFullscreen}
              enableRotate={isFullscreen}
              minDistance={5}
              maxDistance={200}
            />
            <Environment preset="forest" />
          </Suspense>
        </Canvas>

        <Suspense fallback={null}>
          <div className={`absolute ${!isFullscreen ? "opacity-100 z-10" : "opacity-0 z-[-1]"} duration-200 top-0 left-0 w-full h-full`}>
            <HomeText />
          </div>
        </Suspense>
      </div>

      <Suspense fallback={null}>
        <TopIcons isFullscreen={isFullscreen} setIsFullscreen={setIsFullscreen} />
      </Suspense>

      <div className="h-screen relative">
        <Canvas
          shadows
          camera={camProps}
          gl={{ antialias: true }}
          className="absolute top-0 left-0 w-full h-full z-0"
        >
          <Suspense fallback={null}>
            <RotatingStars count={2500} />
          </Suspense>
        </Canvas>

        <Suspense fallback={null}>
          <div className={`${!isFullscreen ? "opacity-100 z-20" : "opacity-0 z-[-1]"} duration-200 top-0 left-0 w-full h-full absolute`}>
            <HomeCardHolder />
          </div>
        </Suspense>
      </div>
    </section>
  );
}
