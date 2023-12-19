/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const fs = require('fs');
const path = require('path');
const core = require('@actions/core');

async function run () {
  // Retrieve environment variables and parameters
  const terraformCliPath = process.env.TERRAFORM_CLI_PATH;
  // This parameter should be set in `action.yaml` to the `runs.post-if` condition after solving issue https://github.com/actions/runner/issues/2800
  const cleanup = core.getInput('cleanup_workspace');

  // Function to recursively delete a directory
  const deleteDirectoryRecursive = function (directoryPath) {
    if (fs.existsSync(directoryPath)) {
      fs.readdirSync(directoryPath).forEach((file) => {
        const curPath = path.join(directoryPath, file);
        if (fs.lstatSync(curPath).isDirectory()) {
          // Recurse
          deleteDirectoryRecursive(curPath);
        } else {
          // Delete file
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(directoryPath);
    }
  };

  // Check if cleanup is required
  if (cleanup === 'true' && terraformCliPath) {
    console.log(`Cleaning up directory: ${terraformCliPath}`);
    deleteDirectoryRecursive(terraformCliPath);
    console.log('Cleanup completed.');
  } else {
    console.log('No cleanup required.');
  }
}
run();
