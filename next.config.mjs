/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['vaibhavparihar.github.io'],
  },
  experimental: {
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
  reactStrictMode: true,
  output: 'export',
  distDir: 'out',
  trailingSlash: true,
  assetPrefix: "/",
}

export default nextConfig
