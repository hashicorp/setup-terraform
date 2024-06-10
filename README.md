# setup-terraform

[![Continuous Integration](https://github.com/hashicorp/setup-terraform/actions/workflows/continuous-integration.yml/badge.svg)](https://github.com/hashicorp/setup-terraform/actions/workflows/continuous-integration.yml)
[![Setup Terraform](https://github.com/hashicorp/setup-terraform/actions/workflows/setup-terraform.yml/badge.svg)](https://github.com/hashicorp/setup-terraform/actions/workflows/setup-terraform.yml)

The `hashicorp/setup-terraform` action is a JavaScript action that sets up Terraform CLI in your GitHub Actions workflow by:

- Downloading a specific version of Terraform CLI and adding it to the `PATH`.
- Configuring the [Terraform CLI configuration file](https://www.terraform.io/docs/commands/cli-config.html) with a HCP Terraform/Terraform Enterprise hostname and API token.
- Installing a wrapper script to wrap subsequent calls of the `terraform` binary and expose its STDOUT, STDERR, and exit code as outputs named `stdout`, `stderr`, and `exitcode` respectively. (This can be optionally skipped if subsequent steps in the same job do not need to access the results of Terraform commands.)

After you've used the action, subsequent steps in the same job can run arbitrary Terraform commands using [the GitHub Actions `run` syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstepsrun). This allows most Terraform commands to work exactly like they do on your local command line.

## Usage

This action can be run on `ubuntu-latest`, `windows-latest`, and `macos-latest` GitHub Actions runners. When running on `windows-latest` the shell should be set to Bash. When running on self-hosted GitHub Actions runners, NodeJS must be previously installed with the version specified in the [`action.yml`](https://github.com/hashicorp/setup-terraform/blob/main/action.yml).

The default configuration installs the latest version of Terraform CLI and installs the wrapper script to wrap subsequent calls to the `terraform` binary:

```yaml
steps:
- uses: hashicorp/setup-terraform@v3
```

A specific version of Terraform CLI can be installed:

```yaml
steps:
- uses: hashicorp/setup-terraform@v3
  with:
    terraform_version: "1.1.7"
```

Credentials for HCP Terraform ([app.terraform.io](https://app.terraform.io/)) can be configured:

```yaml
steps:
- uses: hashicorp/setup-terraform@v3
  with:
    cli_config_credentials_token: ${{ secrets.TF_API_TOKEN }}
```

Credentials for Terraform Enterprise (TFE) can be configured:

```yaml
steps:
- uses: hashicorp/setup-terraform@v3
  with:
    cli_config_credentials_hostname: 'terraform.example.com'
    cli_config_credentials_token: ${{ secrets.TF_API_TOKEN }}
```

The wrapper script installation can be skipped by setting the `terraform_wrapper` variable to `false`:

```yaml
steps:
- uses: hashicorp/setup-terraform@v3
  with:
    terraform_wrapper: false
```

Subsequent steps can access outputs when the wrapper script is installed:

```yaml
steps:
- uses: hashicorp/setup-terraform@v3

- run: terraform init

- id: plan
  run: terraform plan -no-color

- run: echo ${{ steps.plan.outputs.stdout }}
- run: echo ${{ steps.plan.outputs.stderr }}
- run: echo ${{ steps.plan.outputs.exitcode }}
```

Outputs can be used in subsequent steps to comment on the pull request:

> **Notice:** There's a limit to the number of characters inside a GitHub comment (65535).
>
> Due to that limitation, you might end up with a failed workflow run even if the plan succeeded.
>
> Another approach is to append your plan into the $GITHUB_STEP_SUMMARY environment variable which supports markdown.

```yaml
defaults:
  run:
    working-directory: ${{ env.tf_actions_working_dir }}
permissions:
  pull-requests: write
steps:
- uses: actions/checkout@v4
- uses: hashicorp/setup-terraform@v3

- name: Terraform fmt
  id: fmt
  run: terraform fmt -check
  continue-on-error: true

- name: Terraform Init
  id: init
  run: terraform init

- name: Terraform Validate
  id: validate
  run: terraform validate -no-color

- name: Terraform Plan
  id: plan
  run: terraform plan -no-color
  continue-on-error: true

- uses: actions/github-script@v7
  if: github.event_name == 'pull_request'
  env:
    PLAN: "terraform\n${{ steps.plan.outputs.stdout }}"
  with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
    script: |
      const output = `#### Terraform Format and Style 🖌\`${{ steps.fmt.outcome }}\`
      #### Terraform Initialization ⚙️\`${{ steps.init.outcome }}\`
      #### Terraform Validation 🤖\`${{ steps.validate.outcome }}\`
      <details><summary>Validation Output</summary>

      \`\`\`\n
      ${{ steps.validate.outputs.stdout }}
      \`\`\`

      </details>

      #### Terraform Plan 📖\`${{ steps.plan.outcome }}\`

      <details><summary>Show Plan</summary>

      \`\`\`\n
      ${process.env.PLAN}
      \`\`\`

      </details>

      *Pusher: @${{ github.actor }}, Action: \`${{ github.event_name }}\`, Working Directory: \`${{ env.tf_actions_working_dir }}\`, Workflow: \`${{ github.workflow }}\`*`;

      github.rest.issues.createComment({
        issue_number: context.issue.number,
        owner: context.repo.owner,
        repo: context.repo.repo,
        body: output
      })
```

Instead of creating a new comment each time, you can also update an existing one:

```yaml
defaults:
  run:
    working-directory: ${{ env.tf_actions_working_dir }}
permissions:
  pull-requests: write
steps:
- uses: actions/checkout@v4
- uses: hashicorp/setup-terraform@v3

- name: Terraform fmt
  id: fmt
  run: terraform fmt -check
  continue-on-error: true

- name: Terraform Init
  id: init
  run: terraform init

- name: Terraform Validate
  id: validate
  run: terraform validate -no-color

- name: Terraform Plan
  id: plan
  run: terraform plan -no-color
  continue-on-error: true

- uses: actions/github-script@v7
  if: github.event_name == 'pull_request'
  env:
    PLAN: "terraform\n${{ steps.plan.outputs.stdout }}"
  with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
    script: |
      // 1. Retrieve existing bot comments for the PR
      const { data: comments } = await github.rest.issues.listComments({
        owner: context.repo.owner,
        repo: context.repo.repo,
        issue_number: context.issue.number,
      })
      const botComment = comments.find(comment => {
        return comment.user.type === 'Bot' && comment.body.includes('Terraform Format and Style')
      })

      // 2. Prepare format of the comment
      const output = `#### Terraform Format and Style 🖌\`${{ steps.fmt.outcome }}\`
      #### Terraform Initialization ⚙️\`${{ steps.init.outcome }}\`
      #### Terraform Validation 🤖\`${{ steps.validate.outcome }}\`
      <details><summary>Validation Output</summary>

      \`\`\`\n
      ${{ steps.validate.outputs.stdout }}
      \`\`\`

      </details>

      #### Terraform Plan 📖\`${{ steps.plan.outcome }}\`

      <details><summary>Show Plan</summary>

      \`\`\`\n
      ${process.env.PLAN}
      \`\`\`

      </details>

      *Pusher: @${{ github.actor }}, Action: \`${{ github.event_name }}\`, Working Directory: \`${{ env.tf_actions_working_dir }}\`, Workflow: \`${{ github.workflow }}\`*`;

      // 3. If we have a comment, update it, otherwise create a new one
      if (botComment) {
        github.rest.issues.updateComment({
          owner: context.repo.owner,
          repo: context.repo.repo,
          comment_id: botComment.id,
          body: output
        })
      } else {
        github.rest.issues.createComment({
          issue_number: context.issue.number,
          owner: context.repo.owner,
          repo: context.repo.repo,
          body: output
        })
      }
```

## Inputs

The action supports the following inputs:

- `cli_config_credentials_hostname` - (optional) The hostname of a HCP Terraform/Terraform Enterprise instance to
   place within the credentials block of the Terraform CLI configuration file. Defaults to `app.terraform.io`.
- `cli_config_credentials_token` - (optional) The API token for a HCP Terraform/Terraform Enterprise instance to
   place within the credentials block of the Terraform CLI configuration file.
- `terraform_version` - (optional) The version of Terraform CLI to install. Instead of a full version string,
   you can also specify a constraint string (see [Semver Ranges](https://www.npmjs.com/package/semver#ranges)
   for available range specifications). Examples are: `"<1.2.0"`, `"~1.1.0"`, `"1.1.7"` (all three installing
   the latest available `1.1` version). Prerelease versions can be specified and a range will stay within the
   given tag such as `beta` or `rc`. If no version is given, it will default to `latest`.
- `terraform_wrapper` - (optional) Whether to install a wrapper to wrap subsequent calls of
   the `terraform` binary and expose its STDOUT, STDERR, and exit code as outputs
   named `stdout`, `stderr`, and `exitcode` respectively. Defaults to `true`.

## Outputs

This action does not configure any outputs directly. However, when you set the `terraform_wrapper` input
to `true`, the following outputs are available for subsequent steps that call the `terraform` binary:

- `stdout` - The STDOUT stream of the call to the `terraform` binary.
- `stderr` - The STDERR stream of the call to the `terraform` binary.
- `exitcode` - The exit code of the call to the `terraform` binary.

## License

[Mozilla Public License v2.0](LICENSE)

## Code of Conduct

[Code of Conduct](CODE_OF_CONDUCT.md)

## Experimental Status

By using the software in this repository (the "Software"), you acknowledge that: (1) the Software is still in development, may change, and has not been released as a commercial product by HashiCorp and is not currently supported in any way by HashiCorp; (2) the Software is provided on an "as-is" basis, and may include bugs, errors, or other issues;  (3) the Software is NOT INTENDED FOR PRODUCTION USE, use of the Software may result in unexpected results, loss of data, or other unexpected results, and HashiCorp disclaims any and all liability resulting from use of the Software; and (4) HashiCorp reserves all rights to make all decisions about the features, functionality and commercial release (or non-release) of the Software, at any time and without any obligation or liability whatsoever.

## Contributing

### License Headers

All source code files (excluding autogenerated files like `package.json`, prose, and files excluded in [.copywrite.hcl](.copywrite.hcl)) must have a license header at the top.

This can be autogenerated by installing the HashiCorp [`copywrite`](https://github.com/hashicorp/copywrite#getting-started) tool and running `copywrite headers` in the root of the repository.
