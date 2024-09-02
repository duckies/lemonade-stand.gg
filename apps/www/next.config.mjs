/** @type {import('next').NextConfig} */
const config = {
  transpilePackages: ["@lemonade-stand/ui", "react-hook-form"],
  logging: {
    fetches: {
      fullUrl: true,
    }
  },
  experimental: {
    serverComponentsExternalPackages: ["yjs"]
  }
}

export default config;