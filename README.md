# setup-terraform

<p align="left">
  <a href="https://github.com/hashicorp/setup-terraform/actions"><img alt="Continuous Integration" src="https://github.com/hashicorp/setup-terraform/workflows/Continuous%20Integration/badge.svg" /></a>
  <a href="https://github.com/hashicorp/setup-terraform/actions"><img alt="Setup Terraform" src="https://github.com/hashicorp/setup-terraform/workflows/Setup%20Terraform/badge.svg" /></a>
</p>

The `hashicorp/setup-terraform` action is a JavaScript action that sets up Terraform CLI in your GitHub Actions workflow by:

- Downloading a specific version of Terraform CLI and adding it to the `PATH`.
- Configuring the [Terraform CLI configuration file](/docs/commands/cli-config.html) with a Terraform Cloud/Enterprise hostname and API token.
- Installing a wrapper script to wrap subsequent calls of the `terraform` binary and expose its STDOUT, STDERR, and exit code as outputs named `stdout`, `stderr`, and `exitcode` respectively. (This can be optionally skipped if subsequent steps in the same job do not need to access the results of Terraform commands.)

After you've used the action, subsequent steps in the same job can run arbitrary Terraform commands using [the GitHub Actions `run` syntax](https://help.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstepsrun). This allows most Terraform commands to work exactly like they do on your local command line.

## Usage

This action can be run on `ubuntu-latest`, `windows-latest`, and `macos-latest` GitHub Actions runners. When running on `windows-latest` the shell should be set to Bash.

The default configuration installs the latest version of Terraform CLI and installs the wrapper script to wrap subsequent calls to the `terraform` binary.

```yaml
steps:
- uses: hashicorp/setup-terraform@v1 
```

A specific version of Terraform CLI can be installed.

```yaml
steps:
- uses: hashicorp/setup-terraform@v1 
  with:
    terraform_version: 0.12.24
```

Credentials for Terraform Cloud (app.terraform.io) can be configured.

```yaml
steps:
- uses: hashicorp/setup-terraform@v1 
  with:
    cli_config_credentials_token: ${{ secrets.TF_API_TOKEN }}
```

Credentials for Terraform Enterprise can be configured.

```yaml
steps:
- uses: hashicorp/setup-terraform@v1 
  with:
    cli_config_credentials_hostname: 'terraform.example.com'
    cli_config_credentials_token: ${{ secrets.TF_API_TOKEN }}
```

The wrapper script installation can be skipped.

```yaml
steps:
- uses: hashicorp/setup-terraform@v1 
  with:
    terraform_wrapper: false
```

Subsequent steps can access outputs when the wrapper script is installed.


```yaml
steps:
- uses: hashicorp/setup-terraform@v1

- run: terraform init

- id: plan
  run: terraform plan -no-color

- run: echo ${{ steps.plan.outputs.stdout }}
- run: echo ${{ steps.plan.outputs.stderr }}
- run: echo ${{ steps.plan.outputs.exitcode }}
```

Outputs can be used in subsequent steps to comment on the pull request:

```yaml
steps:
- uses: hashicorp/setup-terraform@v1

- run: terraform init

- id: plan
  run: terraform plan -no-color

- uses: actions/github-script@0.9.0
  if: github.event_name == 'pull_request'
  env:
    STDOUT: "```${{ steps.plan.outputs.stdout }}```"
  with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
    script: |
      github.issues.createComment({
        issue_number: context.issue.number,
        owner: context.repo.owner,
        repo: context.repo.repo,
        body: process.env.STDOUT
      })
```

## Inputs

The following inputs are supported.

- `cli_config_credentials_hostname` - (optional) The hostname of a Terraform Cloud/Enterprise instance to place within the credentials block of the Terraform CLI configuration file.

- `cli_config_credentials_token` - (optional) The API token for a Terraform Cloud/Enterprise instance to place within the credentials block of the Terraform CLI configuration file.

- `terraform_version` - (optional) The version of Terraform CLI to install. A value of `latest` will install the latest version of Terraform CLI. Defaults to `latest`.

- `terraform_wrapper` - (optional) Whether or not to install a wrapper to wrap subsequent calls of the `terraform` binary and expose its STDOUT, STDERR, and exit code as outputs named `stdout`, `stderr`, and `exitcode` respectively. Defaults to `true`. 

## Outputs

This action does not configure any outputs directly. However, when the `terraform_wrapper` input is set to `true`, the following outputs will be available for subsequent steps that call the `terraform` binary.

- `stdout` - The STDOUT stream of the call to the `terraform` binary. 

- `stderr` - The STDERR stream of the call to the `terraform` binary. 

- `exitcode` - The exit code of the call to the `terraform` binary.. 

## License

[Mozilla Public License v2.0](https://github.com/hashicorp/setup-terraform/blob/master/LICENSE)

## Code of Conduct

[Code of Conduct](https://github.com/hashicorp/setup-terraform/blob/master/CODE_OF_CONDUCT.md)
