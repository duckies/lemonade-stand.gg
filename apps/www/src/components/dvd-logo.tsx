"use client";

import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

interface DVDLogoProps {
  imageUrl: string;
  width?: number;
  height?: number;
  speed?: number;
  mouseRepel?: boolean;
  repelStrength?: number;
  cornerEscapeVelocity?: number;
}

export function DVDLogo({
  imageUrl,
  width = 50,
  height = 50,
  speed = 2,
  mouseRepel = false,
  repelStrength = 40,
  cornerEscapeVelocity = 15,
}: DVDLogoProps) {
  // Use motion values instead of springs for more precise bouncing
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const dx = useMotionValue(speed); // Changed from useSpring to useMotionValue
  const dy = useMotionValue(speed); // Changed from useSpring to useMotionValue

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const baseSpeed = useRef(speed);

  const [color, setColor] = useState("rgba(255, 0, 0, 0.5)");
  const containerRef = useRef<HTMLDivElement>(null);
  const isStuck = useRef(false);
  const stuckTimer = useRef<Timer | null>(null);
  const lastInteraction = useRef<number>(0);

  // Add state for horizontal flip
  const [isFlippedX, setIsFlippedX] = useState(false);

  const changeColor = useCallback(() => {
    setColor(
      `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256,
      )}, ${Math.floor(Math.random() * 256)}, 0.5)`,
    );
  }, []);

  const [isSpinning, setIsSpinning] = useState(false);
  const handleDoubleClick = () => {
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 1000);
  };

  // Mouse repulsion logic with velocity dampening
  useEffect(() => {
    if (!mouseRepel) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
        lastInteraction.current = Date.now();
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseRepel, mouseX, mouseY]);

  useAnimationFrame(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const currentX = x.get();
    const currentY = y.get();
    let velocityX = dx.get();
    let velocityY = dy.get();

    const { clientWidth, clientHeight } = container;
    let newX = currentX + velocityX;
    let newY = currentY + velocityY;

    // Handle wall collisions with proper bouncing and flipping
    if (newX <= 0) {
      newX = 0;
      velocityX = Math.abs(velocityX);
      dx.set(velocityX);
      changeColor();
      setIsFlippedX((prev) => !prev);
    } else if (newX >= clientWidth - width) {
      newX = clientWidth - width;
      velocityX = -Math.abs(velocityX);
      dx.set(velocityX);
      changeColor();
      setIsFlippedX((prev) => !prev);
    }

    if (newY <= 0) {
      newY = 0;
      velocityY = Math.abs(velocityY);
      dy.set(velocityY);
      changeColor();
    } else if (newY >= clientHeight - height) {
      newY = clientHeight - height;
      velocityY = -Math.abs(velocityY);
      dy.set(velocityY);
      changeColor();
    }

    // Mouse repulsion with gradual return to base speed
    if (mouseRepel) {
      const mousePos = { x: mouseX.get(), y: mouseY.get() };
      const distance = Math.sqrt(
        Math.pow(mousePos.x - (currentX + width / 2), 2) +
          Math.pow(mousePos.y - (currentY + height / 2), 2),
      );

      const timeSinceLastInteraction = Date.now() - lastInteraction.current;
      const dampingFactor = Math.max(0, 1 - timeSinceLastInteraction / 1000);

      if (distance < repelStrength) {
        const angle = Math.atan2(
          currentY + height / 2 - mousePos.y,
          currentX + width / 2 - mousePos.x,
        );

        if (distance < 20) {
          if (!isStuck.current) {
            isStuck.current = true;
            stuckTimer.current = setTimeout(() => {
              const escapeX = Math.cos(angle) * cornerEscapeVelocity;
              const escapeY = Math.sin(angle) * cornerEscapeVelocity;
              dx.set(escapeX);
              dy.set(escapeY);
              isStuck.current = false;
            }, 1000);
          }
        } else {
          if (stuckTimer.current) {
            clearTimeout(stuckTimer.current);
            isStuck.current = false;
          }

          const repulsionForce = (repelStrength / distance) * dampingFactor;
          velocityX += Math.cos(angle) * repulsionForce;
          velocityY += Math.sin(angle) * repulsionForce;

          // Limit maximum velocity
          const maxVelocity = Math.max(speed * 3, cornerEscapeVelocity);
          velocityX = Math.max(Math.min(velocityX, maxVelocity), -maxVelocity);
          velocityY = Math.max(Math.min(velocityY, maxVelocity), -maxVelocity);

          dx.set(velocityX);
          dy.set(velocityY);
        }
      } else {
        // Gradually normalize speed when not being repelled
        const currentSpeed = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
        const targetSpeed = baseSpeed.current;

        // Only normalize if the speed is significantly different from target
        if (Math.abs(currentSpeed - targetSpeed) > 0.1) {
          // Calculate the direction unit vector
          const dirX = velocityX / currentSpeed;
          const dirY = velocityY / currentSpeed;

          // Interpolate speed towards target speed
          const newSpeed = currentSpeed + (targetSpeed - currentSpeed) * 0.02;

          // Apply new speed while maintaining direction
          velocityX = dirX * newSpeed;
          velocityY = dirY * newSpeed;

          dx.set(velocityX);
          dy.set(velocityY);
        }
      }
    }

    x.set(newX);
    y.set(newY);
  });

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden">
      <motion.div
        className={`absolute ${isSpinning ? "animate-spin" : ""}`}
        style={{
          x,
          y,
          width,
          height,
        }}
        onDoubleClick={handleDoubleClick}
      >
        <div
          className="relative w-full h-full transition-transform duration-300"
          style={{
            transform: isFlippedX ? "scaleX(-1)" : "scaleX(1)",
          }}
        >
          <img src={imageUrl} alt="DVD Logo" className="w-full h-full object-contain" />
          <div
            className="absolute inset-0 w-full h-full"
            style={
              {
                maskImage: `url(${imageUrl})`,
                maskSize: "contain",
                maskRepeat: "no-repeat",
                maskPosition: "center",
                backgroundColor: color,
              } as React.CSSProperties
            }
          />
        </div>
      </motion.div>
    </div>
  );
}
