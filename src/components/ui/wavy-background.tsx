"use client";

import { cn } from "@/utils/cn";
import React, { useEffect, useRef } from "react";
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
  const noise = createNoise3D();
  let w: number,
    h: number,
    nt: number,
    i: number,
    x: number,
    ctx: CanvasRenderingContext2D | null,
    canvas: HTMLCanvasElement | null;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getSpeed = () => {
    switch (speed) {
      case "slow":
        return 0.001;
      case "fast":
        return 0.002;
      default:
        return 0.001;
    }
  };

  const waveColors = colors ?? [
    "#38bdf8",
    "#818cf8",
    "#c084fc",
    "#e879f9",
    "#22d3ee",
  ];

  const drawWave = (n: number) => {
    nt += getSpeed();
    if (!ctx) return;
    for (i = 0; i < n; i++) {
      ctx.beginPath();
      ctx.lineWidth = waveWidth || 50;
      ctx.strokeStyle = waveColors[i % waveColors.length];
      for (x = 0; x < w; x += 5) {
        const y = noise(x / 800, 0.3 * i, nt) * 100;
        ctx.lineTo(x, y + h * 0.5); // adjust for height, currently at 50% of the container
      }
      ctx.stroke();
      ctx.closePath();
    }
  };

  useEffect(() => {
    const init = () => {
      canvas = canvasRef.current;
      if (canvas) {
        ctx = canvas.getContext("2d");
        if (ctx) {
          w = ctx.canvas.width = window.innerWidth;
          h = ctx.canvas.height = window.innerHeight;
          ctx.filter = `blur(${blur}px)`;
          nt = 0;
          window.onresize = function () {
            if (ctx) {
              w = ctx.canvas.width = window.innerWidth;
              h = ctx.canvas.height = window.innerHeight;
              ctx.filter = `blur(${blur}px)`;
            }
          };
          render();
        }
      }
    };

    let animationId: number;

    const render = () => {
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
  }, [blur, backgroundFill, waveOpacity, speed, waveWidth, colors]);

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
