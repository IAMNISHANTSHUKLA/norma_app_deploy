"use client";

import { cn } from "@/utils/cn";
import React, { useEffect, useRef, useCallback, useMemo } from "react";
import { createNoise3D } from "simplex-noise";
import { CardContainer, CardBody } from "./3d-card";

// Define the type for the 'course' prop
interface Course {
  id: string;
  title: string;
  description: string;
  // Add other properties of the course object as needed
}

// WavyBackground component
export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}: {
  children?: any;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  [key: string]: any;
}) => {
  const noise = useMemo(() => createNoise3D(), []);
  
  // Using useRef to preserve the values across renders
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const wRef = useRef<number>(0);
  const hRef = useRef<number>(0);
  const ntRef = useRef<number>(0);

  // Wrap 'getSpeed' in useCallback
  const getSpeed = useCallback(() => {
    switch (speed) {
      case "slow":
        return 0.001;
      case "fast":
        return 0.002;
      default:
        return 0.001;
    }
  }, [speed]);

  // Wrap 'waveColors' in useMemo
  const waveColors = useMemo(() => {
    return colors ?? [
      "#38bdf8",
      "#818cf8",
      "#c084fc",
      "#e879f9",
      "#22d3ee",
    ];
  }, [colors]);

  const drawWave = useCallback(
    (n: number) => {
      ntRef.current += getSpeed();
      const ctx = ctxRef.current;
      const w = wRef.current;
      const h = hRef.current;
      if (!ctx) return;
      for (let i = 0; i < n; i++) {
        ctx.beginPath();
        ctx.lineWidth = waveWidth || 50;
        ctx.strokeStyle = waveColors[i % waveColors.length];
        for (let x = 0; x < w; x += 5) {
          const y = noise(x / 800, 0.3 * i, ntRef.current) * 100;
          ctx.lineTo(x, y + h * 0.5); // adjust for height, currently at 50% of the container
        }
        ctx.stroke();
        ctx.closePath();
      }
    },
    [getSpeed, waveWidth, waveColors, noise]
  );

  useEffect(() => {
    const init = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        ctxRef.current = ctx;
        if (ctx) {
          wRef.current = ctx.canvas.width = window.innerWidth;
          hRef.current = ctx.canvas.height = window.innerHeight;
          ctx.filter = `blur(${blur}px)`;
          ntRef.current = 0;
          window.onresize = function () {
            if (ctx) {
              wRef.current = ctx.canvas.width = window.innerWidth;
              hRef.current = ctx.canvas.height = window.innerHeight;
              ctx.filter = `blur(${blur}px)`;
            }
          };
          render();
        }
      }
    };

    let animationId: number;

    const render = () => {
      const ctx = ctxRef.current;
      const w = wRef.current;
      const h = hRef.current;
      if (ctx) {
        ctx.fillStyle = backgroundFill || "black";
        ctx.globalAlpha = waveOpacity || 0.5;
        ctx.fillRect(0, 0, w, h);
        drawWave(5);
        animationId = requestAnimationFrame(render);
      }
    };

    init();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [blur, backgroundFill, waveOpacity, speed, waveWidth, colors, drawWave]);

  return (
    <div
      className={cn(
        "h-screen flex flex-col items-center justify-center",
        containerClassName
      )}
    >
      <canvas className="absolute inset-0 z-0" ref={canvasRef} id="canvas"></canvas>
      <div className={cn("relative z-10", className)} {...props}>
        {children}
      </div>
    </div>
  );
};

// CourseCard component
const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  return (
    <CardContainer className="inter-var m-4">
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
        <h3 className="text-lg font-semibold">{course.title}</h3>
        <p className="text-sm">{course.description}</p>
        {/* Add more content related to the course if needed */}
      </CardBody>
    </CardContainer>
  );
};

export default CourseCard;
