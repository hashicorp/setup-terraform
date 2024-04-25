#!/usr/bin/env node
/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const io = require('@actions/io');
const core = require('@actions/core');
const { exec } = require('@actions/exec');

const OutputListener = require('./lib/output-listener');
const pathToCLI = require('./lib/terraform-bin');

async function checkTerraform () {
  // Setting check to `true` will cause `which` to throw if terraform isn't found
  const check = true;
  return io.which(pathToCLI, check);
}

(async () => {
  // This will fail if Terraform isn't found, which is what we want
  await checkTerraform();

  // Create listeners to receive output (in memory)
  const stdout = new OutputListener(process.stdout);
  const stderr = new OutputListener(process.stderr);
  const listeners = {
    stdout: stdout.listener,
    stderr: stderr.listener
  };

  // Execute terraform and capture output
  const args = process.argv.slice(2);
  const options = {
    listeners,
    ignoreReturnCode: true,
    silent: true // avoid printing command in stdout: https://github.com/actions/toolkit/issues/649
  };
  const exitCode = await exec(pathToCLI, args, options);

  // Set outputs, result, exitcode, and stderr
  core.setOutput('stdout', stdout.contents);
  core.setOutput('stderr', stderr.contents);
  core.setOutput('exitcode', exitCode.toString(10));

  if (exitCode === 0 || exitCode === 2) {
    // A exitCode of 0 is considered a success
    // An exitCode of 2 may be returned when the '-detailed-exitcode' option
    // is passed to plan. This denotes Success with non-empty
    // diff (changes present).
    return;
  }

  // A non-zero exitCode is considered an error
  core.setFailed(`Terraform exited with code ${exitCode}.`);
})();
