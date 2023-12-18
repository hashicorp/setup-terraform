/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const fs = require('fs');
const path = require('path');

// Retrieve environment variables and parameters
const terraformCliPath = process.env.TERRAFORM_CLI_PATH;

// Function to recursively delete a directory
const deleteDirectoryRecursive = function(directoryPath) {
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
if (terraformCliPath) {
    console.log(`Cleaning up directory: ${terraformCliPath}`);
    deleteDirectoryRecursive(terraformCliPath);
    console.log('Cleanup completed.');
} else {
    console.log('No cleanup required.');
}
