/**
 * Copyright IBM Corp. 2020, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

// Mock external modules by default
jest.mock('@actions/core');
jest.mock('@actions/tool-cache');
// Mock Node.js core modules
jest.mock('os');

const os = require('os');
const path = require('path');
const fs = require('fs').promises;

const io = require('@actions/io');
const core = require('@actions/core');
const tc = require('@actions/tool-cache');
const nock = require('nock');
const releases = require('@hashicorp/js-releases');

const json = require('./index.json');
const setup = require('../lib/setup-terraform');

// Overwrite defaults
// core.debug = jest
//   .fn(console.log);
// core.error = jest
//   .fn(console.error);

describe('Setup Terraform', () => {
  const HOME = process.env.HOME;
  const APPDATA = process.env.APPDATA;

  beforeEach(() => {
    process.env.HOME = '/tmp/asdf';
    process.env.APPDATA = '/tmp/asdf';

    // Stub the checksum/signature verification by default. The real
    // implementation streams the downloaded zip and fetches the signed
    // SHA256SUMS over the network, neither of which exists under the mocked
    // download in these tests. Individual tests override this to exercise the
    // verification path.
    jest
      .spyOn(releases.Release.prototype, 'verify')
      .mockResolvedValue();
  });

  afterEach(async () => {
    jest.restoreAllMocks();
    await io.rmRF(process.env.HOME);
    process.env.HOME = HOME;
    process.env.APPDATA = APPDATA;
  });

  test('gets specific version and adds token and hostname on linux, amd64', async () => {
    const version = '0.1.1';
    const credentialsHostname = 'app.terraform.io';
    const credentialsToken = 'asdfjkl';

    core.getInput = jest
      .fn()
      .mockReturnValueOnce(version)
      .mockReturnValueOnce(credentialsHostname)
      .mockReturnValueOnce(credentialsToken);

    tc.downloadTool = jest
      .fn()
      .mockReturnValueOnce('file.zip');

    tc.extractZip = jest
      .fn()
      .mockReturnValueOnce('file');

    os.platform = jest
      .fn()
      .mockReturnValue('linux');

    os.arch = jest
      .fn()
      .mockReturnValue('amd64');

    nock('https://releases.hashicorp.com')
      .get('/terraform/index.json')
      .reply(200, json);

    const versionObj = await setup();
    expect(versionObj.version).toEqual('0.1.1');

    // downloaded CLI has been added to path
    expect(core.addPath).toHaveBeenCalled();
    // expect credentials are in ${HOME}.terraformrc
    const creds = await fs.readFile(`${process.env.HOME}/.terraformrc`, { encoding: 'utf8' });
    expect(creds.indexOf(credentialsHostname)).toBeGreaterThan(-1);
    expect(creds.indexOf(credentialsToken)).toBeGreaterThan(-1);
  });

  test('gets specific version and adds token and hostname on windows, 386', async () => {
    const version = '0.1.1';
    const credentialsHostname = 'app.terraform.io';
    const credentialsToken = 'asdfjkl';

    core.getInput = jest
      .fn()
      .mockReturnValueOnce(version)
      .mockReturnValueOnce(credentialsHostname)
      .mockReturnValueOnce(credentialsToken);

    tc.downloadTool = jest
      .fn()
      .mockReturnValueOnce('file.zip');

    io.mv = jest.fn();

    tc.extractZip = jest
      .fn()
      .mockReturnValueOnce('file');

    os.platform = jest
      .fn()
      .mockReturnValue('win32');

    os.arch = jest
      .fn()
      .mockReturnValue('386');

    nock('https://releases.hashicorp.com')
      .get('/terraform/index.json')
      .reply(200, json);

    const versionObj = await setup();
    expect(versionObj.version).toEqual('0.1.1');

    // downloaded CLI has been added to path
    expect(core.addPath).toHaveBeenCalled();

    // expect credentials are in ${HOME}.terraformrc
    const creds = await fs.readFile(`${process.env.HOME}/terraform.rc`, { encoding: 'utf8' });
    expect(creds.indexOf(credentialsHostname)).toBeGreaterThan(-1);
    expect(creds.indexOf(credentialsToken)).toBeGreaterThan(-1);
  });

  test('gets latest version and adds token and hostname on linux, amd64', async () => {
    const version = 'latest';
    const credentialsHostname = 'app.terraform.io';
    const credentialsToken = 'asdfjkl';

    core.getInput = jest
      .fn()
      .mockReturnValueOnce(version)
      .mockReturnValueOnce(credentialsHostname)
      .mockReturnValueOnce(credentialsToken);

    tc.downloadTool = jest
      .fn()
      .mockReturnValueOnce('file.zip');

    tc.extractZip = jest
      .fn()
      .mockReturnValueOnce('file');

    os.platform = jest
      .fn()
      .mockReturnValue('linux');

    os.arch = jest
      .fn()
      .mockReturnValue('amd64');

    nock('https://releases.hashicorp.com')
      .get('/terraform/index.json')
      .reply(200, json);

    const versionObj = await setup();
    expect(versionObj.version).toEqual('0.10.0');

    // downloaded CLI has been added to path
    expect(core.addPath).toHaveBeenCalled();

    // expect credentials are in ${HOME}.terraformrc
    const creds = await fs.readFile(`${process.env.HOME}/.terraformrc`, { encoding: 'utf8' });
    expect(creds.indexOf(credentialsHostname)).toBeGreaterThan(-1);
    expect(creds.indexOf(credentialsToken)).toBeGreaterThan(-1);
  });

  test('gets latest version matching specification adds token and hostname on linux, amd64', async () => {
    const version = '<0.10.0';
    const credentialsHostname = 'app.terraform.io';
    const credentialsToken = 'asdfjkl';

    core.getInput = jest
      .fn()
      .mockReturnValueOnce(version)
      .mockReturnValueOnce(credentialsHostname)
      .mockReturnValueOnce(credentialsToken);

    tc.downloadTool = jest
      .fn()
      .mockReturnValueOnce('file.zip');

    tc.extractZip = jest
      .fn()
      .mockReturnValueOnce('file');

    os.platform = jest
      .fn()
      .mockReturnValue('linux');

    os.arch = jest
      .fn()
      .mockReturnValue('amd64');

    nock('https://releases.hashicorp.com')
      .get('/terraform/index.json')
      .reply(200, json);

    const versionObj = await setup();
    expect(versionObj.version).toEqual('0.1.1');

    // downloaded CLI has been added to path
    expect(core.addPath).toHaveBeenCalled();

    // expect credentials are in ${HOME}.terraformrc
    const creds = await fs.readFile(`${process.env.HOME}/.terraformrc`, { encoding: 'utf8' });
    expect(creds.indexOf(credentialsHostname)).toBeGreaterThan(-1);
    expect(creds.indexOf(credentialsToken)).toBeGreaterThan(-1);
  });

  test('gets latest version matching tilde range patch', async () => {
    const version = '~0.1.0';
    const credentialsHostname = 'app.terraform.io';
    const credentialsToken = 'asdfjkl';

    core.getInput = jest
      .fn()
      .mockReturnValueOnce(version)
      .mockReturnValueOnce(credentialsHostname)
      .mockReturnValueOnce(credentialsToken);

    tc.downloadTool = jest
      .fn()
      .mockReturnValueOnce('file.zip');

    tc.extractZip = jest
      .fn()
      .mockReturnValueOnce('file');

    os.platform = jest
      .fn()
      .mockReturnValue('linux');

    os.arch = jest
      .fn()
      .mockReturnValue('amd64');

    nock('https://releases.hashicorp.com')
      .get('/terraform/index.json')
      .reply(200, json);

    const versionObj = await setup();
    expect(versionObj.version).toEqual('0.1.1');

    // downloaded CLI has been added to path
    expect(core.addPath).toHaveBeenCalled();
    // expect credentials are in ${HOME}.terraformrc
    const creds = await fs.readFile(`${process.env.HOME}/.terraformrc`, { encoding: 'utf8' });
    expect(creds.indexOf(credentialsHostname)).toBeGreaterThan(-1);
    expect(creds.indexOf(credentialsToken)).toBeGreaterThan(-1);
  });

  test('gets latest version matching tilde range minor', async () => {
    const version = '~0.1';
    const credentialsHostname = 'app.terraform.io';
    const credentialsToken = 'asdfjkl';

    core.getInput = jest
      .fn()
      .mockReturnValueOnce(version)
      .mockReturnValueOnce(credentialsHostname)
      .mockReturnValueOnce(credentialsToken);

    tc.downloadTool = jest
      .fn()
      .mockReturnValueOnce('file.zip');

    tc.extractZip = jest
      .fn()
      .mockReturnValueOnce('file');

    os.platform = jest
      .fn()
      .mockReturnValue('linux');

    os.arch = jest
      .fn()
      .mockReturnValue('amd64');

    nock('https://releases.hashicorp.com')
      .get('/terraform/index.json')
      .reply(200, json);

    const versionObj = await setup();
    expect(versionObj.version).toEqual('0.1.1');

    // downloaded CLI has been added to path
    expect(core.addPath).toHaveBeenCalled();
    // expect credentials are in ${HOME}.terraformrc
    const creds = await fs.readFile(`${process.env.HOME}/.terraformrc`, { encoding: 'utf8' });
    expect(creds.indexOf(credentialsHostname)).toBeGreaterThan(-1);
    expect(creds.indexOf(credentialsToken)).toBeGreaterThan(-1);
  });

  test('gets latest version matching tilde range minor', async () => {
    const version = '~0';
    const credentialsHostname = 'app.terraform.io';
    const credentialsToken = 'asdfjkl';

    core.getInput = jest
      .fn()
      .mockReturnValueOnce(version)
      .mockReturnValueOnce(credentialsHostname)
      .mockReturnValueOnce(credentialsToken);

    tc.downloadTool = jest
      .fn()
      .mockReturnValueOnce('file.zip');

    tc.extractZip = jest
      .fn()
      .mockReturnValueOnce('file');

    os.platform = jest
      .fn()
      .mockReturnValue('linux');

    os.arch = jest
      .fn()
      .mockReturnValue('amd64');

    nock('https://releases.hashicorp.com')
      .get('/terraform/index.json')
      .reply(200, json);

    const versionObj = await setup();
    expect(versionObj.version).toEqual('0.10.0');

    // downloaded CLI has been added to path
    expect(core.addPath).toHaveBeenCalled();
    // expect credentials are in ${HOME}.terraformrc
    const creds = await fs.readFile(`${process.env.HOME}/.terraformrc`, { encoding: 'utf8' });
    expect(creds.indexOf(credentialsHostname)).toBeGreaterThan(-1);
    expect(creds.indexOf(credentialsToken)).toBeGreaterThan(-1);
  });

  test('gets latest version matching .X range ', async () => {
    const version = '0.1.x';
    const credentialsHostname = 'app.terraform.io';
    const credentialsToken = 'asdfjkl';

    core.getInput = jest
      .fn()
      .mockReturnValueOnce(version)
      .mockReturnValueOnce(credentialsHostname)
      .mockReturnValueOnce(credentialsToken);

    tc.downloadTool = jest
      .fn()
      .mockReturnValueOnce('file.zip');

    tc.extractZip = jest
      .fn()
      .mockReturnValueOnce('file');

    os.platform = jest
      .fn()
      .mockReturnValue('linux');

    os.arch = jest
      .fn()
      .mockReturnValue('amd64');

    nock('https://releases.hashicorp.com')
      .get('/terraform/index.json')
      .reply(200, json);

    const versionObj = await setup();
    expect(versionObj.version).toEqual('0.1.1');

    // downloaded CLI has been added to path
    expect(core.addPath).toHaveBeenCalled();
    // expect credentials are in ${HOME}.terraformrc
    const creds = await fs.readFile(`${process.env.HOME}/.terraformrc`, { encoding: 'utf8' });
    expect(creds.indexOf(credentialsHostname)).toBeGreaterThan(-1);
    expect(creds.indexOf(credentialsToken)).toBeGreaterThan(-1);
  });

  test('gets latest version matching - range ', async () => {
    const version = '0.1.0 - 0.1.1';
    const credentialsHostname = 'app.terraform.io';
    const credentialsToken = 'asdfjkl';

    core.getInput = jest
      .fn()
      .mockReturnValueOnce(version)
      .mockReturnValueOnce(credentialsHostname)
      .mockReturnValueOnce(credentialsToken);

    tc.downloadTool = jest
      .fn()
      .mockReturnValueOnce('file.zip');

    tc.extractZip = jest
      .fn()
      .mockReturnValueOnce('file');

    os.platform = jest
      .fn()
      .mockReturnValue('linux');

    os.arch = jest
      .fn()
      .mockReturnValue('amd64');

    nock('https://releases.hashicorp.com')
      .get('/terraform/index.json')
      .reply(200, json);

    const versionObj = await setup();
    expect(versionObj.version).toEqual('0.1.1');

    // downloaded CLI has been added to path
    expect(core.addPath).toHaveBeenCalled();
    // expect credentials are in ${HOME}.terraformrc
    const creds = await fs.readFile(`${process.env.HOME}/.terraformrc`, { encoding: 'utf8' });
    expect(creds.indexOf(credentialsHostname)).toBeGreaterThan(-1);
    expect(creds.indexOf(credentialsToken)).toBeGreaterThan(-1);
  });

  test('fails when metadata cannot be downloaded', async () => {
    const version = 'latest';
    const credentialsHostname = 'app.terraform.io';
    const credentialsToken = 'asdfjkl';

    core.getInput = jest
      .fn()
      .mockReturnValueOnce(version)
      .mockReturnValueOnce(credentialsHostname)
      .mockReturnValueOnce(credentialsToken);

    nock('https://releases.hashicorp.com')
      .get('/terraform/index.json')
      .reply(404);

    try {
      await setup();
    } catch (e) {
      expect(core.error).toHaveBeenCalled();
    }
  });

  test('fails when specific version cannot be found', async () => {
    const version = '0.9.9';
    const credentialsHostname = 'app.terraform.io';
    const credentialsToken = 'asdfjkl';

    core.getInput = jest
      .fn()
      .mockReturnValueOnce(version)
      .mockReturnValueOnce(credentialsHostname)
      .mockReturnValueOnce(credentialsToken);

    nock('https://releases.hashicorp.com')
      .get('/terraform/index.json')
      .reply(200, json);

    try {
      await setup();
    } catch (e) {
      expect(core.error).toHaveBeenCalled();
    }
  });

  test('fails when CLI for os and architecture cannot be found', async () => {
    const version = '0.1.1';
    const credentialsHostname = 'app.terraform.io';
    const credentialsToken = 'asdfjkl';

    core.getInput = jest
      .fn()
      .mockReturnValueOnce(version)
      .mockReturnValueOnce(credentialsHostname)
      .mockReturnValueOnce(credentialsToken);

    nock('https://releases.hashicorp.com')
      .get('/terraform/index.json')
      .reply(200, json);

    tc.downloadTool = jest
      .fn()
      .mockReturnValueOnce('file.zip');

    tc.extractZip = jest
      .fn()
      .mockReturnValueOnce('file');

    os.platform = jest
      .fn()
      .mockReturnValue('madeupplat');

    os.arch = jest
      .fn()
      .mockReturnValue('madeuparch');

    try {
      await setup();
    } catch (e) {
      expect(core.error).toHaveBeenCalled();
    }
  });

  test('fails when CLI cannot be downloaded', async () => {
    const version = '0.1.1';
    const credentialsHostname = 'app.terraform.io';
    const credentialsToken = 'asdfjkl';

    core.getInput = jest
      .fn()
      .mockReturnValueOnce(version)
      .mockReturnValueOnce(credentialsHostname)
      .mockReturnValueOnce(credentialsToken);

    nock('https://releases.hashicorp.com')
      .get('/terraform/index.json')
      .reply(200, json);

    tc.downloadTool = jest
      .fn()
      .mockReturnValueOnce('');

    tc.extractZip = jest
      .fn()
      .mockReturnValueOnce('');

    os.platform = jest
      .fn()
      .mockReturnValue('linux');

    os.arch = jest
      .fn()
      .mockReturnValue('amd64');

    try {
      await setup();
    } catch (e) {
      expect(core.error).toHaveBeenCalled();
    }
  });

  test('installs wrapper on linux', async () => {
    const version = '0.1.1';
    const credentialsHostname = 'app.terraform.io';
    const credentialsToken = 'asdfjkl';
    const wrapperPath = path.resolve([__dirname, '..', 'wrapper', 'dist', 'index.js'].join(path.sep));

    const ioMv = jest.spyOn(io, 'mv')
      .mockImplementation(() => {});
    const ioCp = jest.spyOn(io, 'cp')
      .mockImplementation(() => {});

    core.getInput = jest
      .fn()
      .mockReturnValueOnce(version)
      .mockReturnValueOnce(credentialsHostname)
      .mockReturnValueOnce(credentialsToken)
      .mockReturnValueOnce('true');

    tc.downloadTool = jest
      .fn()
      .mockReturnValueOnce('file.zip');

    tc.extractZip = jest
      .fn()
      .mockReturnValueOnce('file');

    os.platform = jest
      .fn()
      .mockReturnValue('linux');

    os.arch = jest
      .fn()
      .mockReturnValue('amd64');

    nock('https://releases.hashicorp.com')
      .get('/terraform/index.json')
      .reply(200, json);

    await setup();

    expect(ioMv).toHaveBeenCalledWith(`file${path.sep}terraform`, `file${path.sep}terraform-bin`);
    expect(ioCp).toHaveBeenCalledWith(wrapperPath, `file${path.sep}terraform`);
  });

  test('installs wrapper on windows', async () => {
    const version = '0.1.1';
    const credentialsHostname = 'app.terraform.io';
    const credentialsToken = 'asdfjkl';
    const wrapperPath = path.resolve([__dirname, '..', 'wrapper', 'dist', 'index.js'].join(path.sep));

    const ioMv = jest.spyOn(io, 'mv')
      .mockImplementation(() => {});
    const ioCp = jest.spyOn(io, 'cp')
      .mockImplementation(() => {});

    core.getInput = jest
      .fn()
      .mockReturnValueOnce(version)
      .mockReturnValueOnce(credentialsHostname)
      .mockReturnValueOnce(credentialsToken)
      .mockReturnValueOnce('true');

    tc.downloadTool = jest
      .fn()
      .mockReturnValueOnce('file.zip');

    tc.extractZip = jest
      .fn()
      .mockReturnValueOnce('file');

    os.platform = jest
      .fn()
      .mockReturnValue('win32');

    os.arch = jest
      .fn()
      .mockReturnValue('386');

    nock('https://releases.hashicorp.com')
      .get('/terraform/index.json')
      .reply(200, json);

    await setup();

    expect(ioMv).toHaveBeenCalledWith(`file${path.sep}terraform.exe`, `file${path.sep}terraform-bin.exe`);
    expect(ioCp).toHaveBeenCalledWith(wrapperPath, `file${path.sep}terraform`);
  });

  test('verifies the downloaded archive against the published SHA256SUMS', async () => {
    const version = '0.1.1';

    core.getInput = jest
      .fn()
      .mockReturnValueOnce(version);

    tc.downloadTool = jest
      .fn()
      .mockReturnValueOnce('file.zip');

    tc.extractZip = jest
      .fn()
      .mockReturnValueOnce('file');

    os.platform = jest
      .fn()
      .mockReturnValue('linux');

    os.arch = jest
      .fn()
      .mockReturnValue('amd64');

    nock('https://releases.hashicorp.com')
      .get('/terraform/index.json')
      .reply(200, json);

    await setup();

    // The downloaded zip is verified against the platform-specific build name
    // before it is extracted and added to the path.
    expect(releases.Release.prototype.verify).toHaveBeenCalledWith('file.zip', 'terraform_0.1.1_linux_amd64.zip');
    expect(core.addPath).toHaveBeenCalled();
  });

  test('fails when the downloaded archive does not match the published SHA256SUMS', async () => {
    const version = '0.1.1';

    core.getInput = jest
      .fn()
      .mockReturnValueOnce(version);

    tc.downloadTool = jest
      .fn()
      .mockReturnValueOnce('file.zip');

    tc.extractZip = jest
      .fn()
      .mockReturnValueOnce('file');

    os.platform = jest
      .fn()
      .mockReturnValue('linux');

    os.arch = jest
      .fn()
      .mockReturnValue('amd64');

    releases.Release.prototype.verify
      .mockReset()
      .mockRejectedValueOnce(new Error('Install error: SHA sum for terraform_0.1.1_linux_amd64.zip does not match.'));

    nock('https://releases.hashicorp.com')
      .get('/terraform/index.json')
      .reply(200, json);

    await expect(setup()).rejects.toThrow('does not match');

    // A failed verification must stop the install before the archive is
    // extracted, so the unverified binary is never placed on the path.
    expect(tc.extractZip).not.toHaveBeenCalled();
  });
});
