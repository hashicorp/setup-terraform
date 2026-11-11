/**
 * Copyright IBM Corp. 2020, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

const { spawnSync } = require('child_process');
const path = require('path');

describe('terraform wrapper', () => {
  function runWrapper (exitCode) {
    // Keep the real output and failure reporting, replacing only the CLI runner.
    const script = `
      require('@actions/io').which = async () => 'terraform-bin';
      require('@actions/exec').exec = async (command, args, options) => {
        options.listeners.stdout(Buffer.from('terraform stdout'));
        options.listeners.stderr(Buffer.from('terraform stderr'));
        return ${JSON.stringify(exitCode)};
      };
      require('./wrapper/terraform');
    `;
    return spawnSync(process.execPath, ['-e', script], {
      cwd: path.resolve(__dirname, '../..'),
      env: { ...process.env, GITHUB_OUTPUT: '' },
      encoding: 'utf8'
    });
  }

  test('reports a missing exit code without crashing', () => {
    const result = runWrapper(null);

    expect(result.error).toBeUndefined();
    expect(result.status).toBe(1);
    expect(result.stdout).toContain('::set-output name=stdout::terraform stdout');
    expect(result.stdout).toContain('::set-output name=stderr::terraform stderr');
    expect(result.stdout).not.toContain('::set-output name=exitcode::');
    expect(result.stdout).toContain('Terraform terminated without an exit code');
    expect(result.stderr).not.toContain('TypeError');
  });

  test.each([0, 1, 2])('preserves reporting for exit code %i', (exitCode) => {
    const result = runWrapper(exitCode);

    expect(result.error).toBeUndefined();
    expect(result.status).toBe(exitCode === 1 ? 1 : 0);
    expect(result.stdout).toContain(`::set-output name=exitcode::${exitCode}`);
    expect(result.stdout).not.toContain('Terraform terminated without an exit code');
  });
});
