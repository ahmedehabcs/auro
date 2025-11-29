import React, { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const Home = lazy(() => import("./pages/Home.jsx"));
const Loading = lazy(() => import("./pages/splashScreen.jsx"));
const DesignPage = lazy(() => import("./pages/Design.jsx"));
const ThreeDVideos = lazy(() => import("./pages/Videos.jsx"));
const SponsorPage = lazy(() => import("./pages/Sponsor.jsx"));
const Footer = lazy(() => import("./components/Footer"));

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-1000 ${
          isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{ zIndex: isLoading ? "100" : "-1" }}
      >
        <Suspense fallback={<div></div>}>
          <Loading />
        </Suspense>
      </div>

      <div className="flex flex-col min-h-screen">
        <div className="grow">
          <Suspense fallback={<div></div>}>
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />

              {["/home", "/design", "/videos", "/sponsors"].map((path) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    <main className="overflow-x-hidden">
                      {path === "/home" && <Home />}
                      {path === "/design" && <DesignPage />}
                      {path === "/videos" && <ThreeDVideos />}
                      {path === "/sponsors" && <SponsorPage />}
                    </main>
                  }
                />
              ))}

              <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
          </Suspense>
        </div>

        <Suspense fallback={<div></div>}>
          <Footer />
        </Suspense>
      </div>
    </>
  );
}

export default App;
