#!/usr/bin/env node

/**
 * Build Configuration Validation Script
 * Validates the build configuration and generates a report
 */

const { validateBuildConfiguration, generateBuildReport } = require('../lib/build/validator');

function main() {
  console.log('🔍 Validating build configuration...\n');
  
  try {
    const validation = validateBuildConfiguration();
    const report = generateBuildReport();
    
    console.log(report);
    
    if (!validation.valid) {
      console.error('\n❌ Build configuration validation failed!');
      process.exit(1);
    } else {
      console.log('\n✅ Build configuration is valid!');
      
      if (validation.warnings.length > 0 || validation.recommendations.length > 0) {
        console.log('\n💡 Consider addressing the warnings and recommendations above for optimal performance.');
      }
    }
  } catch (error) {
    console.error('❌ Error during validation:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { main };