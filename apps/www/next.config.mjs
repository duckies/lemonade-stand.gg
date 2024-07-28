/** @type {import('next').NextConfig} */
const config = {
  transpilePackages: ["@repo/ui"],
  logging: {
    fetches: {
      fullUrl: true,
    }
  }
}

export default config;