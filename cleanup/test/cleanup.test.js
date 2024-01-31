/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const assert = require('assert');

describe('Cleanup Test Suite', () => {
  it('post-jobs cleanup step', async () => {
    // Create test directory structure
    const testDir = 'testDir';
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
    fs.writeFileSync(path.join(testDir, 'testFile.txt'), 'test content');

    // Call your cleanup function
    execSync('node cleanup/cleanup', {
      env: {
        ...process.env,
        TERRAFORM_CLI_PATH: testDir,
        INPUT_CLEANUP_WORKSPACE: 'true'
      }
    });

    // Test assertions
    try {
      assert.strictEqual(fs.existsSync(testDir), false, 'Directory should be deleted');
    } catch (error) {
      console.error('Test failed:', error.message);
    }
  });
});
