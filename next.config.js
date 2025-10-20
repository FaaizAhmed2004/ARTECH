const { getOptimizedWebpackConfig, getBuildPerformanceConfig } = require('./lib/build/config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enhanced SWC minification with better memory management
  swcMinify: true,
  
  // Optimized experimental features for reliability
  experimental: {
    // Disabled optimizeCss due to critters module issue and memory usage
    // optimizeCss: true,
    workerThreads: false,
    cpus: 1,
    // Enable modern build features for better performance
    esmExternals: true,
    serverComponentsExternalPackages: [],
  },
  
  // Enhanced image optimization settings
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 828, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 days
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Enhanced compression and caching
  compress: true,
  poweredByHeader: false,
  
  // Build performance configuration
  ...getBuildPerformanceConfig(),
  
  // Enhanced webpack configuration with dynamic optimization
  webpack: (config, context) => {
    return getOptimizedWebpackConfig(config, context);
  },
  
  // Security headers (simplified)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
  
  // Redirects for SEO
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig