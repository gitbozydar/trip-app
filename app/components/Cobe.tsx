"use client";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";

interface GlobeProps {
  targetLocation?: [number, number];
}

export function Cobe({ targetLocation }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const locationToAngles = (lat: number, lng: number): [number, number] => {
    return [
      Math.PI - ((lng * Math.PI) / 180 - Math.PI / 2),
      (lat * Math.PI) / 180,
    ];
  };

  const focusRef = useRef<[number, number]>([0, 0]);
  const autoRotateSpeed = 0.003;

  useEffect(() => {
    let width = 0;
    let phi = 0;
    let theta = 0.3;
    const doublePi = Math.PI * 2;

    const onResize = () => {
      if (!canvasRef.current) return;
      width = canvasRef.current.offsetWidth;
    };

    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current!, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 0,
      diffuse: 1.2,
      mapBrightness: 1.1,
      baseColor: [1, 1, 1],
      markerColor: [1, 0.6, 0.2],
      glowColor: [1, 1, 1],
      mapSamples: 16000,
      markers: [],
      onRender: (state) => {
        state.width = width * 2;
        state.height = width * 2;

        // Jeśli nie ma targetu → auto-rotate
        if (!targetLocation) {
          phi += autoRotateSpeed;
        } else {
          // Jeśli jest target → smooth rotate to location
          const [targetPhi, targetTheta] = focusRef.current;

          const distPositive = (targetPhi - phi + doublePi) % doublePi;
          const distNegative = (phi - targetPhi + doublePi) % doublePi;

          if (distPositive < distNegative) {
            phi += distPositive * 0.05;
          } else {
            phi -= distNegative * 0.05;
          }

          theta = theta * 0.92 + targetTheta * 0.08;
        }

        state.phi = phi;
        state.theta = theta;
      },
    });

    setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = "1";
    }, 300);

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [targetLocation]);

  useEffect(() => {
    if (targetLocation) {
      focusRef.current = locationToAngles(targetLocation[0], targetLocation[1]);
    }
  }, [targetLocation]);

  return (
    <div className="w-full max-w-[600px] aspect-square relative">
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-0 transition-opacity duration-1000 contain-[layout_paint_size]"
      />
    </div>
  );
}
