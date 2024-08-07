/** @type {import('next').NextConfig} */
const config = {
  transpilePackages: ["@repo/ui", "react-hook-form"],
  logging: {
    fetches: {
      fullUrl: true,
    }
  },
  experimental: {
    serverComponentsExternalPackages: ["rrule-rust"]
  }
}

export default config;