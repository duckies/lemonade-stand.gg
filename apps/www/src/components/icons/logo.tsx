import type { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {}

export function LemonLogo(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="400"
      height="400"
      viewBox="0 0 400 400"
      fill="none"
      {...props}
    >
      <path
        d="M61.7951 85.3323C-29.5962 205.812 30.8766 268.024 4.95976 344.693C-8.22601 369.326 9.0519 387.19 9.0519 387.19C9.0519 387.19 23.147 408.219 51.3374 396.39C85.6884 385.301 119.571 388.839 154.55 390.447C210.782 393.032 269.846 390.63 338.242 314.464C429.634 193.983 369.161 131.772 395.078 55.1028C406.899 31.5438 393.714 14.3585 393.714 14.3585C393.714 14.3585 376.89 -8.42315 348.7 3.40579C259.128 32.321 172.738 -38.2146 61.7951 85.3323Z"
        fill="url(#paint0_linear_14_2)"
      />
      <path
        d="M61.7951 85.3323C-29.5962 205.812 30.8766 268.024 4.95976 344.693C-8.22601 369.326 9.0519 387.19 9.0519 387.19C9.0519 387.19 23.147 408.219 51.3374 396.39C85.6884 385.301 119.571 388.839 154.55 390.447C210.782 393.032 269.846 390.63 338.242 314.464C429.634 193.983 369.161 131.772 395.078 55.1028C406.899 31.5438 393.714 14.3585 393.714 14.3585C393.714 14.3585 376.89 -8.42315 348.7 3.40579C259.128 32.321 172.738 -38.2146 61.7951 85.3323Z"
        fill="url(#paint1_radial_14_2)"
        fillOpacity="0.2"
      />
      <defs>
        <linearGradient
          id="paint0_linear_14_2"
          x1="366.433"
          y1="-21.9055"
          x2="81.4096"
          y2="415.079"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFF38A" />
          <stop offset="1" stopColor="#E8DB87" />
        </linearGradient>
        <radialGradient
          id="paint1_radial_14_2"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(150.455 131.148) rotate(54.5406) scale(232.347)"
        >
          <stop stopColor="#FFF092" />
          <stop offset="0.8" stopColor="#F9E396" />
          <stop offset="1" stopColor="#B49B6A" />
        </radialGradient>
      </defs>
    </svg>
  );
}
