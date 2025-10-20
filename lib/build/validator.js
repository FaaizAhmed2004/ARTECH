/**
 * Build Configuration Validator
 * Validates build configuration and provides recommendations
 */

const { getCurrentEnvironment, validateEnvironment } = require('./environment');
const { calculateOptimalMemorySettings } = require('./config');

/**
 * Validates the complete build configuration
 */
function validateBuildConfiguration() {
  const result = {
    valid: true,
    warnings: [],
    errors: [],
    recommendations: [],
  };

  // Validate environment
  const envValidation = validateEnvironment();
  if (!envValidation.valid) {
    result.valid = false;
    result.errors.push(...envValidation.issues);
  }

  // Check memory configuration
  const memorySettings = calculateOptimalMemorySettings();
  const currentEnv = getCurrentEnvironment();
  
  if (memorySettings.maxOldSpaceSize > currentEnv.memoryLimit) {
    result.warnings.push(
      `Optimal memory setting (${memorySettings.maxOldSpaceSize}MB) exceeds environment limit (${currentEnv.memoryLimit}MB)`
    );
    result.recommendations.push('Consider upgrading to a higher memory tier or optimizing bundle size');
  }

  // Validate Next.js configuration
  try {
    const nextConfig = require('../../next.config.js');
    
    if (!nextConfig.swcMinify) {
      result.warnings.push('SWC minification is disabled, which may increase bundle size');
      result.recommendations.push('Enable swcMinify for better performance');
    }

    if (!nextConfig.compress) {
      result.warnings.push('Compression is disabled');
      result.recommendations.push('Enable compression to reduce bundle size');
    }

    if (nextConfig.experimental?.workerThreads !== false) {
      result.warnings.push('Worker threads are enabled, which may increase memory usage');
      result.recommendations.push('Consider disabling worker threads for memory-constrained environments');
    }
  } catch (error) {
    result.errors.push('Unable to validate Next.js configuration: ' + error.message);
    result.valid = false;
  }

  // Check for common build issues
  try {
    const packageJson = require('../../package.json');
    
    // Check for memory-intensive dependencies
    const heavyDependencies = [
      '@babel/core',
      'webpack-bundle-analyzer',
      'eslint',
    ];
    
    const installedHeavyDeps = heavyDependencies.filter(dep => 
      packageJson.dependencies?.[dep] || packageJson.devDependencies?.[dep]
    );
    
    if (installedHeavyDeps.length > 0) {
      result.warnings.push(`Memory-intensive dependencies detected: ${installedHeavyDeps.join(', ')}`);
      result.recommendations.push('Consider moving heavy dependencies to devDependencies if not needed in production');
    }
  } catch (error) {
    result.warnings.push('Unable to validate package.json');
  }

  // Check TypeScript configuration
  try {
    const fs = require('fs');
    if (fs.existsSync('tsconfig.json')) {
      const tsConfig = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'));
      
      if (!tsConfig.compilerOptions?.incremental) {
        result.recommendations.push('Enable TypeScript incremental compilation for faster builds');
      }
      
      if (tsConfig.compilerOptions?.strict !== true) {
        result.warnings.push('TypeScript strict mode is not enabled');
        result.recommendations.push('Enable strict mode to catch more errors at build time');
      }
    }
  } catch (error) {
    result.warnings.push('Unable to validate TypeScript configuration');
  }

  return result;
}

/**
 * Generates a build configuration report
 */
function generateBuildReport() {
  const validation = validateBuildConfiguration();
  const environment = getCurrentEnvironment();
  const memorySettings = calculateOptimalMemorySettings();
  
  let report = '# Build Configuration Report\n\n';
  
  report += `## Environment: ${environment.name}\n`;
  report += `- Memory Limit: ${environment.memoryLimit}MB\n`;
  report += `- Build Timeout: ${environment.buildTimeout / 1000}s\n`;
  report += `- Optimization Level: ${environment.optimizationLevel}\n`;
  report += `- Cache Strategy: ${environment.cacheStrategy}\n\n`;
  
  report += `## Memory Configuration\n`;
  report += `- Optimal Max Old Space: ${memorySettings.maxOldSpaceSize}MB\n`;
  report += `- Heap Size: ${memorySettings.heapSize}MB\n`;
  report += `- GC Settings: ${JSON.stringify(memorySettings.gcSettings, null, 2)}\n\n`;
  
  if (validation.errors.length > 0) {
    report += `## Errors\n`;
    validation.errors.forEach(error => {
      report += `- ❌ ${error}\n`;
    });
    report += '\n';
  }
  
  if (validation.warnings.length > 0) {
    report += `## Warnings\n`;
    validation.warnings.forEach(warning => {
      report += `- ⚠️ ${warning}\n`;
    });
    report += '\n';
  }
  
  if (validation.recommendations.length > 0) {
    report += `## Recommendations\n`;
    validation.recommendations.forEach(rec => {
      report += `- 💡 ${rec}\n`;
    });
    report += '\n';
  }
  
  report += `## Status: ${validation.valid ? '✅ Valid' : '❌ Issues Found'}\n`;
  
  return report;
}

module.exports = {
  validateBuildConfiguration,
  generateBuildReport,
};