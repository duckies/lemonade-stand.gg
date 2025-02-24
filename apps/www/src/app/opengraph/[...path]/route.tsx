import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// export const alt = "Lemonade Stand";
// export const size = {
//   width: 1200,
//   height: 630,
// };

// export const contentType = "image/png";

// type OpenGraphImageProps = {
//   params: {};
// };

type Context = {
  params: Promise<{ path: string[] }>;
};

export async function GET(req: NextRequest, { params }: Context) {
  const { ...data } = await params;
  const fonbtSerif = await readFile(join(process.cwd(), "public/fonts/recoleta/recoleta-bold.ttf"));

  return new ImageResponse(
    <div
      style={{
        fontSize: 128,
        background: "white",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      Lemonade Stand
    </div>,
    {
      width: 1200,
      height: 620,
      fonts: [
        {
          name: "Recoleta",
          data: fonbtSerif,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}
