/**
 * Build Configuration Utilities
 * Provides dynamic memory allocation and build optimization settings
 */

export interface BuildConfiguration {
  memorySettings: {
    maxOldSpaceSize: number;
    heapSize: number;
    gcSettings: GarbageCollectionConfig;
  };
  optimizationSettings: {
    minification: boolean;
    treeShaking: boolean;
    codesplitting: CodeSplittingConfig;
  };
  cacheSettings: {
    buildCache: boolean;
    dependencyCache: boolean;
    staticAssetCache: boolean;
  };
}

export interface GarbageCollectionConfig {
  maxOldGenerationSizeMb: number;
  maxYoungGenerationSizeMb: number;
  enableConcurrentMarking: boolean;
}

export interface CodeSplittingConfig {
  chunks: 'all' | 'async' | 'initial';
  minSize: number;
  maxSize: number;
  cacheGroups: Record<string, any>;
}

/**
 * Calculates optimal memory settings based on available system memory
 */
export function calculateOptimalMemorySettings(): BuildConfiguration['memorySettings'] {
  // Get available memory (fallback to 4GB if unable to detect)
  const totalMemoryMB = process.env.VERCEL_MEMORY_LIMIT 
    ? parseInt(process.env.VERCEL_MEMORY_LIMIT) 
    : 4096;
  
  // Allocate 75% of available memory for Node.js heap
  const maxOldSpaceSize = Math.floor(totalMemoryMB * 0.75);
  
  return {
    maxOldSpaceSize,
    heapSize: maxOldSpaceSize,
    gcSettings: {
      maxOldGenerationSizeMb: Math.floor(maxOldSpaceSize * 0.8),
      maxYoungGenerationSizeMb: Math.floor(maxOldSpaceSize * 0.2),
      enableConcurrentMarking: true,
    },
  };
}

/**
 * Gets environment-specific build configuration
 */
export function getEnvironmentConfig(): Partial<BuildConfiguration> {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const isProduction = process.env.NODE_ENV === 'production';
  const isVercel = process.env.VERCEL === '1';

  return {
    optimizationSettings: {
      minification: isProduction,
      treeShaking: isProduction,
      codesplitting: {
        chunks: 'all',
        minSize: isDevelopment ? 10000 : 20000,
        maxSize: isDevelopment ? 200000 : 244000,
        cacheGroups: {
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: -10,
            chunks: 'all',
            maxSize: isVercel ? 200000 : 244000, // Smaller chunks for Vercel
          },
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'react',
            priority: 10,
            chunks: 'all',
          },
        },
      },
    },
    cacheSettings: {
      buildCache: true,
      dependencyCache: true,
      staticAssetCache: isProduction,
    },
  };
}

/**
 * Generates optimized webpack configuration
 */
export function getOptimizedWebpackConfig(config: any, { isServer, dev }: { isServer: boolean; dev: boolean }) {
  const envConfig = getEnvironmentConfig();
  
  // Apply code splitting configuration
  if (envConfig.optimizationSettings?.codesplitting) {
    config.optimization.splitChunks = envConfig.optimizationSettings.codesplitting;
  }

  // Memory optimization for large builds
  if (!dev) {
    config.optimization.minimize = true;
    config.optimization.sideEffects = false;
    
    // Reduce memory usage during build
    config.optimization.moduleIds = 'deterministic';
    config.optimization.chunkIds = 'deterministic';
  }

  // Cache configuration for faster rebuilds
  if (envConfig.cacheSettings?.buildCache) {
    config.cache = {
      type: 'filesystem',
      buildDependencies: {
        config: [__filename],
      },
      cacheDirectory: '.next/cache/webpack',
    };
  }

  // Resolve configuration for better dependency handling
  config.resolve.alias = {
    ...config.resolve.alias,
    '@': require('path').resolve(__dirname, '../..'),
  };

  return config;
}

/**
 * Gets build performance monitoring configuration
 */
export function getBuildPerformanceConfig() {
  return {
    profile: process.env.ANALYZE === 'true',
    measureFileSizesBeforeBuild: true,
    generateBuildId: () => {
      return `build-${Date.now()}`;
    },
  };
}