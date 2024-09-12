import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { getImageUrl } from "../utils.js";

const Preloader = () => {
  const logoRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });

    tl.to(logoRef.current, {
      duration: 1.5,
      scale: 1.2,
      opacity: 1,
      ease: "power2.inOut",
    }).to(logoRef.current, {
      duration: 1.5,
      scale: 1,
      opacity: 0.5,
      ease: "power2.inOut",
    });

    return () => tl.kill();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <div ref={logoRef} className="w-32 h-32">
        <img
          src={getImageUrl("Logo/indiapost.png")}
          alt="Logo"
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default Preloader;
