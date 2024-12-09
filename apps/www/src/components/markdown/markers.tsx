import Image from "next/image";
import CircleMarker from "#content/guides/images/markers/circle.png";
import CrossMarker from "#content/guides/images/markers/cross.png";
import DiamondMarker from "#content/guides/images/markers/diamond.png";
import MoonMarker from "#content/guides/images/markers/moon.png";
import SkullMarker from "#content/guides/images/markers/skull.png";
import SquareMarker from "#content/guides/images/markers/square.png";
import StarMarker from "#content/guides/images/markers/star.png";
import TriangleMarker from "#content/guides/images/markers/triangle.png";

export function Circle() {
  return (
    <Image
      src={CircleMarker}
      alt="Circle Marker"
      height="22"
      className="inline-block h-7 w-auto transition-transform will-change-transform hover:scale-105 hover:animate-pulse"
    />
  );
}

export function Cross() {
  return (
    <Image
      src={CrossMarker}
      alt="Cross Marker"
      height="22"
      className="inline-block h-7 w-auto transition-transform will-change-transform hover:scale-105 hover:animate-pulse"
    />
  );
}

export function Diamond() {
  return (
    <Image
      src={DiamondMarker}
      alt="Diamond Marker"
      height="22"
      className="inline-block h-7 w-auto transition-transform will-change-transform hover:scale-105 hover:animate-pulse"
    />
  );
}

export function Moon() {
  return (
    <Image
      src={MoonMarker}
      alt="Moon Marker"
      height="22"
      className="inline-block h-7 w-auto transition-transform will-change-transform hover:scale-105 hover:animate-pulse"
    />
  );
}

export function Skull() {
  return (
    <Image
      src={SkullMarker}
      alt="Skull Marker"
      height="22"
      className="inline-block h-7 w-auto transition-transform will-change-transform hover:scale-105 hover:animate-pulse"
    />
  );
}

export function Square() {
  return (
    <Image
      src={SquareMarker}
      alt="Square Marker"
      height="22"
      className="inline-block h-7 w-auto transition-transform will-change-transform hover:scale-105 hover:animate-pulse"
    />
  );
}

export function Star() {
  return (
    <Image
      src={StarMarker}
      alt="Star Marker"
      height="22"
      className="inline-block h-7 w-auto transition-transform will-change-transform hover:scale-105 hover:animate-pulse"
    />
  );
}

export function Triangle() {
  return (
    <Image
      src={TriangleMarker}
      alt="Triangle Marker"
      height="22"
      className="inline-block h-7 w-auto transition-transform will-change-transform hover:scale-105 hover:animate-pulse"
    />
  );
}
