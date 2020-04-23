const os = require('os');
const path = require('path');

module.exports = (() => {
  // If we're on Windows, then the executable ends with .exe
  const exeSuffix = os.platform().startsWith('win') ? '.exe' : '';

  return [process.env.TERRAFORM_CLI_PATH, `terraform-bin${exeSuffix}`].join(path.sep);
})();
