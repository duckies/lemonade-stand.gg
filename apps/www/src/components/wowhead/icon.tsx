import { cn } from "@lemonade-stand/ui";
import { useSpell } from "hooks/wowhead";
import type { ImageProps } from "next/image";
import type { WowheadEnv } from "./constants";

type WarcraftIconProps = Omit<ImageProps, "id" | "width" | "height" | "alt" | "src"> & {
  id: number | string;
  size?: number;
  env?: WowheadEnv;
};

export function WarcraftIcon({ id, size, env, ...props }: WarcraftIconProps) {
  const { data, status } = useSpell(id, env);

  if (status === "pending") {
    return (
      <div
        className={cn(
          "bg-[url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAACXBIWXMAAC4jAAAuIwF4pT92AAABQUlEQVQYlQE2Acn+ARwbGvHz9zsoDB8XFPwDFhID9SQbFBJEZvv5AMemjAT6+PlXRTJbShgYEwfg19n25M8rJCUnTSUAACLyt4QBX1JAa1kXxM3S/PwMHhcfCAwXAPHm69rNKSgFyeMFBBkU7srQ4QkSPCAUEAQIAT1NZfPp7ODb39W/qM7QxwME/vYmJiRJTVHe2drSx6/57+Pp6PIHDAgmMjrBzuoDFyMsKSseCPXQ/gYT7O//BwIFExkk5+fn+Pz/6PH8Az9EOAMOFsXQ5xAJ+yEQ8+rw9+7+G/wAAuv3ANbb4wL49vkQEA4DDR7t8fIbFf8ECgb+8svt6dQM/NYH/+sE9/v5RSwAJgf2vdABv90OFRAF3u4J9gUYDxMe+QX2AUFFOhkTBODk7+HyDSgeBjEe/sHeDgYHCw0PC/Tn4xcMjiY0hOSFAAAAAElFTkSuQmCC)]",
          "bg-cover bg-no-repeat",
          "[box-shadow:0_0_0_1px_rgb(250 214 122)]",
        )}
        style={{ height: size, width: size }}
      />
    );
  }

  const src =
    status === "error"
      ? "https://cdn.lemonade-stand.gg/icons/inv_misc_questionmark.jpg"
      : `https://cdn.lemonade-stand.gg/icons/${data.icon}.jpg`;

  return (
    <img
      src={src}
      className="transition-opacity"
      width={size || 56}
      height={size || 56}
      alt={data?.name || ""}
      style={{ boxShadow: "0 0 0 1px rgb(250 214 122)" }}
      onLoad={(e) =>
        // Rather annoying way to remove a hyper-specific border-radius from Wowhead.
        (e.target as HTMLImageElement).style.setProperty("border-radius", "0px", "important")
      }
      {...props}
    />
  );
}
