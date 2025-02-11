import Image from "next/image";
import CircleMarker from "./assets/circle.png";
import CrossMarker from "./assets/cross.png";
import DiamondMarker from "./assets/diamond.png";
import MoonMarker from "./assets/moon.png";
import SkullMarker from "./assets/skull.png";
import SquareMarker from "./assets/square.png";
import StarMarker from "./assets/star.png";
import TriangleMarker from "./assets/triangle.png";

export function Circle() {
  return (
    <Image
      src={CircleMarker}
      alt="Circle Marker"
      height="22"
      className="not-prose inline-block h-6 w-auto transition-transform will-change-transform hover:scale-105 hover:animate-pulse"
    />
  );
}

export function Cross() {
  return (
    <Image
      src={CrossMarker}
      alt="Cross Marker"
      height="22"
      className="not-prose inline-block h-6 w-auto transition-transform will-change-transform hover:scale-105 hover:animate-pulse"
    />
  );
}

export function Diamond() {
  return (
    <Image
      src={DiamondMarker}
      alt="Diamond Marker"
      height="22"
      className="not-prose inline-block h-6 w-auto transition-transform will-change-transform hover:scale-105 hover:animate-pulse"
    />
  );
}

export function Moon() {
  return (
    <Image
      src={MoonMarker}
      alt="Moon Marker"
      height="22"
      className="not-prose inline-block h-6 w-auto transition-transform will-change-transform hover:scale-105 hover:animate-pulse"
    />
  );
}

export function Skull() {
  return (
    <Image
      src={SkullMarker}
      alt="Skull Marker"
      height="22"
      className="not-prose inline-block h-6 w-auto transition-transform will-change-transform hover:scale-105 hover:animate-pulse"
    />
  );
}

export function Square() {
  return (
    <Image
      src={SquareMarker}
      alt="Square Marker"
      height="22"
      className="not-prose inline-block h-6 w-auto transition-transform will-change-transform hover:scale-105 hover:animate-pulse"
    />
  );
}

export function Star() {
  return (
    <Image
      src={StarMarker}
      alt="Star Marker"
      height="22"
      className="not-prose inline-block h-6 w-auto transition-transform will-change-transform hover:scale-105 hover:animate-pulse"
    />
  );
}

export function Triangle() {
  return (
    <Image
      src={TriangleMarker}
      alt="Triangle Marker"
      height="22"
      className="not-prose inline-block h-6 w-auto transition-transform will-change-transform hover:scale-105 hover:animate-pulse"
    />
  );
}
