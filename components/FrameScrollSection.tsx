"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FrameScrollSectionProps {
  framesPath?: string;
  totalFrames?: number;
  frameExtension?: string;
}

interface TextOverlay {
  text: string;
  sub: string;
  start: number;
  end: number;
}

const TEXT_OVERLAYS: TextOverlay[] = [
  { text: "STRENGTH", sub: "Built through relentless discipline", start: 0.15, end: 0.35 },
  { text: "ENDURANCE", sub: "Forged in the fire of persistence", start: 0.4, end: 0.6 },
  { text: "REVOLUTION", sub: "The change starts now", start: 0.7, end: 0.9 },
];

export default function FrameScrollSection({
  framesPath = "/frames/ezgif-frame-",
  totalFrames = 40,
  frameExtension = ".jpg",
}: FrameScrollSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const isPlayingRef = useRef(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeOverlay, setActiveOverlay] = useState<TextOverlay | null>(null);

  const formatFrameNumber = useCallback(
    (num: number): string => {
      return String(num).padStart(3, "0");
    },
    []
  );

  const getFrameUrl = useCallback(
    (index: number): string => {
      return `${framesPath}${formatFrameNumber(index + 1)}${frameExtension}`;
    },
    [framesPath, frameExtension, formatFrameNumber]
  );

  const drawFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      const img = framesRef.current[frameIndex];
      if (!canvas || !ctx || !img || !img.complete) return;

      // Cover-fit the image
      const canvasAspect = canvas.width / canvas.height;
      const imgAspect = img.naturalWidth / img.naturalHeight;
      let drawW: number, drawH: number, drawX: number, drawY: number;

      if (imgAspect > canvasAspect) {
        drawH = canvas.height;
        drawW = drawH * imgAspect;
        drawX = (canvas.width - drawW) / 2;
        drawY = 0;
      } else {
        drawW = canvas.width;
        drawH = drawW / imgAspect;
        drawX = 0;
        drawY = (canvas.height - drawH) / 2;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, drawX, drawY, drawW, drawH);

      // Dark vignette overlay
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        canvas.width * 0.2,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width * 0.7
      );
      gradient.addColorStop(0, "rgba(0,0,0,0)");
      gradient.addColorStop(1, "rgba(0,0,0,0.6)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    },
    []
  );

  // Load frames progressively
  useEffect(() => {
    const images: HTMLImageElement[] = new Array(totalFrames);
    let loadedCount = 0;

    const loadImage = (index: number): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          images[index] = img;
          loadedCount++;
          setLoadProgress(Math.round((loadedCount / totalFrames) * 100));
          if (loadedCount === totalFrames) {
            framesRef.current = images;
            setIsLoaded(true);
          }
          resolve();
        };
        img.onerror = () => {
          loadedCount++;
          setLoadProgress(Math.round((loadedCount / totalFrames) * 100));
          if (loadedCount === totalFrames) {
            framesRef.current = images;
            setIsLoaded(true);
          }
          resolve();
        };
        img.src = getFrameUrl(index);
      });
    };

    // Load first 10 frames immediately
    const initialBatch = Math.min(10, totalFrames);
    const initialPromises: Promise<void>[] = [];
    for (let i = 0; i < initialBatch; i++) {
      initialPromises.push(loadImage(i));
    }

    // Load rest in background
    Promise.all(initialPromises).then(() => {
      const remaining: Promise<void>[] = [];
      for (let i = initialBatch; i < totalFrames; i++) {
        remaining.push(loadImage(i));
      }
      return Promise.all(remaining);
    });

    return () => {
      // cleanup
      framesRef.current = [];
    };
  }, [totalFrames, getFrameUrl]);

  // Set up canvas auto-play loop
  useEffect(() => {
    if (!isLoaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(currentFrameRef.current);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    let animationFrameId: number;
    let lastTime = 0;
    const fps = 24; // Smooth cinematic 24fps
    const frameInterval = 1000 / fps;

    const loop = (timestamp: number) => {
      if (!lastTime) lastTime = timestamp;
      const elapsed = timestamp - lastTime;

      if (elapsed > frameInterval) {
        lastTime = timestamp - (elapsed % frameInterval);

        if (isPlayingRef.current) {
          if (currentFrameRef.current < totalFrames - 1) {
            currentFrameRef.current++;
            drawFrame(currentFrameRef.current);

            // Update text overlay
            const progress = currentFrameRef.current / (totalFrames - 1);
            const currentOverlay = TEXT_OVERLAYS.find(
              (o) => progress >= o.start && progress <= o.end
            );
            setActiveOverlay(currentOverlay || null);
          } else {
            // Stop at the end
            isPlayingRef.current = false;
          }
        }
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isLoaded, totalFrames, drawFrame]);

  return (
    <section id="frame-scroll" className="relative group cursor-pointer">
      {/* Loading screen */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 bg-gym-dark flex flex-col items-center justify-center gap-6"
          >
            <div className="text-2xl font-black tracking-widest text-white">
              REVOLUTION <span className="text-gym-red">GYM</span>
            </div>
            <div className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-gym-red to-gym-orange rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${loadProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="text-sm text-white/40 font-mono">
              Loading experience... {loadProgress}%
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Canvas container */}
      <div 
        ref={containerRef} 
        className="relative w-full h-screen"
        onMouseEnter={() => {
          if (currentFrameRef.current >= totalFrames - 1) {
            currentFrameRef.current = 0; // Reset if it was at the end
            drawFrame(0);
            setActiveOverlay(null);
          }
          isPlayingRef.current = true;
        }}
        onMouseLeave={() => {
          isPlayingRef.current = false;
        }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />

        {/* Text overlays */}
        <AnimatePresence mode="wait">
          {activeOverlay && (
            <motion.div
              key={activeOverlay.text}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, y: -20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none"
            >
              <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white drop-shadow-[0_0_60px_rgba(229,0,10,0.4)]">
                {activeOverlay.text}
              </h2>
              <p className="text-sm sm:text-lg text-white/60 mt-4 tracking-wide">
                {activeOverlay.sub}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top & bottom gradients for blending */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-gym-dark to-transparent z-[5] pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gym-dark to-transparent z-[5] pointer-events-none" />

        {/* Progress indicator */}
        {isLoaded && (
          <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-2">
            {TEXT_OVERLAYS.map((overlay, i) => (
              <div
                key={i}
                className={`w-1.5 h-8 rounded-full transition-all duration-300 ${
                  activeOverlay?.text === overlay.text
                    ? "bg-gym-red scale-y-125"
                    : "bg-white/20"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
