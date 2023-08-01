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
const os = require("os");
const releases = require("@hashicorp/js-releases");

async function checkTerraform () {
  // Setting check to `true` will cause `which` to throw if terraform isn't found
  const check = true;
  return io.which(pathToCLI, check);
}

(async () => {
  // This will fail if Terraform isn't found, which is what we want
  await checkTerraform();

  // Create listeners to receive output (in memory) as well
  const stdout = new OutputListener();
  const stderr = new OutputListener();
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

  // TODO: remove
  core.setCommandEcho(true);

  const exitCode = await exec(pathToCLI, args, options);

  // Pass-through stdout/err as `exec` won't due to `silent: true` option
  process.stdout.write(stdout.contents);
  process.stderr.write(stderr.contents);

  const fail_on_detected_diff2 = core.getInput('fail_on_detected_diff')
  core.debug(`fail_on_detected_diff2: ${fail_on_detected_diff2}`);

  // Gather GitHub Actions inputs
  const version = core.getInput('terraform_version');
  core.debug(`TEST d Terraform version ${version}`);
  core.info(`TEST i Terraform version ${version}`);

  // Set outputs, result, exitcode, and stderr
  core.setOutput('stdout', stdout.contents);
  core.setOutput('stderr', stderr.contents);
  core.setOutput('exitcode', exitCode.toString(10));

  // A exitCode of 0 is considered a success
  if (exitCode === 0) {
    core.info('Terraform completed successfully. (0)');
    return;
  }
  // An exitCode of 2 may be returned when the '-detailed-exitcode' option
  // is passed to plan. This denotes Success with non-empty diff (changes present).
  // The user may want to capture this and fail the job, so will set `fail_on_detected_diff: true`
  if (exitCode === 2) {
    const is_wrapper = core.getInput('terraform_wrapper')
    const terraform_version = core.getInput('terraform_version');
    const failOnDetectedDiffString = core.getInput('fail_on_detected_diff');
    // const failOnDetectedDiff = core.getBooleanInput('fail_on_detected_diff');
//#    getInput('my-input').toUpper() === 'true'

    ///////////////////////////////
    failOnDetectedDiff = (failOnDetectedDiffString.toLowerCase() === 'fail');
    failOnDetectedDiff = true;
    core.info(`FORCING fail_on_detected_diff. Fix later when you can.`); // TODO: fix issue and remove override
    //////////////////////////////

    core.debug(`Terraform detected a difference. (2) failOnDetectedDiffString=${failOnDetectedDiffString} failOnDetectedDiff=${failOnDetectedDiff}`);
    core.info(`Terraform detected a difference. 4 (2) is_wrapper=${is_wrapper} terraform_version=${terraform_version} failOnDetectedDiffString=${failOnDetectedDiffString} failOnDetectedDiff=${failOnDetectedDiff}`);
    if (!failOnDetectedDiff) {
      core.info('Terraform difference ignored.');
      return;
    }
  }

  // A non-zero exitCode is considered an error
  core.setFailed(`Terraform exited with code ${exitCode}.`);
})();
