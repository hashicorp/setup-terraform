# v1.4.0 (unreleased)

- Update js-releases to v1.4.0 to address HCSEC-2021-12 (#111)

# v1.3.2 (2020-12-09)

- Update js-releases to fix missing dep in bundle (#78)

# v1.3.1 (2020-12-08)

- Fix build dependency (#76)

# v1.3.0 (2020-12-08)

- Use `@hashicorp/js-releases` package to identify and download the specified version of Terraform. This will ensure that our tooling is consistent in how it works with the releases API, especially when handling pre-releases. (#70, #73)

# v1.2.1 (2020-10-30)

- Update dependencies to resolve CVE-2020-15228 (#63)

# v1.2.0

- Allow `terraform_version` to take a version constraint. ([#38](https://github.com/hashicorp/setup-terraform/pull/38))

# v1.1.0

- Ignore pre-release versions when `terraform_version` is set to `latest`. ([#19](https://github.com/hashicorp/setup-terraform/pull/19))

# v1.0.1

- Bump @actions/http-client from 1.0.6 to 1.0.8. ([#1](https://github.com/hashicorp/setup-terraform/pull/1))

# v1.0.0

- Initial release.
