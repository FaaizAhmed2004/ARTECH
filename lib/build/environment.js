/**
 * Environment-specific build configurations
 * Handles different build settings for development, production, and Vercel environments
 */

/**
 * Gets the current environment configuration
 */
function getCurrentEnvironment() {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const isProduction = process.env.NODE_ENV === 'production';
  const isVercel = process.env.VERCEL === '1';
  const isCI = process.env.CI === 'true';

  if (isDevelopment) {
    return {
      name: 'development',
      memoryLimit: 2048, // 2GB for development
      buildTimeout: 300000, // 5 minutes
      optimizationLevel: 'minimal',
      cacheStrategy: 'filesystem',
      bundleAnalysis: false,
    };
  }

  if (isVercel) {
    return {
      name: 'vercel',
      memoryLimit: parseInt(process.env.VERCEL_MEMORY_LIMIT || '3008'), // Vercel Pro limit
      buildTimeout: 900000, // 15 minutes (Vercel limit)
      optimizationLevel: 'aggressive',
      cacheStrategy: 'filesystem',
      bundleAnalysis: process.env.ANALYZE === 'true',
    };
  }

  if (isCI) {
    return {
      name: 'ci',
      memoryLimit: 4096, // 4GB for CI
      buildTimeout: 600000, // 10 minutes
      optimizationLevel: 'standard',
      cacheStrategy: 'filesystem',
      bundleAnalysis: true,
    };
  }

  // Production fallback
  return {
    name: 'production',
    memoryLimit: 4096, // 4GB default
    buildTimeout: 600000, // 10 minutes
    optimizationLevel: 'aggressive',
    cacheStrategy: 'filesystem',
    bundleAnalysis: process.env.ANALYZE === 'true',
  };
}

/**
 * Validates environment configuration and system resources
 */
function validateEnvironment() {
  const config = getCurrentEnvironment();
  const issues = [];

  // Check Node.js version
  const nodeVersion = process.version;
  const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
  if (majorVersion < 18) {
    issues.push(`Node.js version ${nodeVersion} is not supported. Please use Node.js 18 or higher.`);
  }

  // Check available memory
  const availableMemory = process.env.VERCEL_MEMORY_LIMIT 
    ? parseInt(process.env.VERCEL_MEMORY_LIMIT)
    : 4096;
  
  if (availableMemory < config.memoryLimit) {
    issues.push(`Available memory (${availableMemory}MB) is less than required (${config.memoryLimit}MB).`);
  }

  // Check required environment variables
  const requiredEnvVars = ['NODE_ENV'];
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      issues.push(`Required environment variable ${envVar} is not set.`);
    }
  }

  return {
    valid: issues.length === 0,
    issues,
  };
}

/**
 * Gets Node.js runtime options based on environment
 */
function getNodeOptions() {
  const config = getCurrentEnvironment();
  const options = [];

  // Memory settings
  options.push(`--max-old-space-size=${config.memoryLimit}`);
  
  // Garbage collection optimization
  if (config.optimizationLevel === 'aggressive') {
    options.push('--optimize-for-size');
    options.push('--gc-interval=100');
  }

  // Enable heap profiling in development
  if (config.name === 'development' && process.env.HEAP_PROFILE === 'true') {
    options.push('--inspect');
    options.push('--heap-prof');
  }

  return options;
}

/**
 * Applies environment-specific optimizations to package.json scripts
 */
function getOptimizedBuildScript() {
  const config = getCurrentEnvironment();
  const nodeOptions = getNodeOptions().join(' ');
  
  let buildCommand = 'next build';
  
  // Add bundle analysis for production builds
  if (config.bundleAnalysis) {
    buildCommand = 'cross-env ANALYZE=true ' + buildCommand;
  }
  
  // Add memory optimization
  if (nodeOptions) {
    buildCommand = `cross-env NODE_OPTIONS='${nodeOptions}' ${buildCommand}`;
  }
  
  return buildCommand;
}

module.exports = {
  getCurrentEnvironment,
  validateEnvironment,
  getNodeOptions,
  getOptimizedBuildScript,
};