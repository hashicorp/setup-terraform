# [2.0.0] (2022-04-18)

BREAKING CHANGES:

* Support Actions Runners v2.285.0 or later by upgrading to Nodejs v16 runtime by @chenrui333 in https://github.com/hashicorp/setup-terraform/pull/170

NOTES:

* docs: Update existing PR comments example by @tobiasbueschel in https://github.com/hashicorp/setup-terraform/pull/178
* Update Terraform versions and usage in README examples by @ksatirli in https://github.com/hashicorp/setup-terraform/pull/176
* Update grammar in README.md by @dustindortch in https://github.com/hashicorp/setup-terraform/pull/180

INTERNAL:

* Bump @actions/github from 5.0.0 to 5.0.1 by @dependabot in https://github.com/hashicorp/setup-terraform/pull/177
* dependabot: track github-actions dependency changes by @chenrui333 in https://github.com/hashicorp/setup-terraform/pull/179

# [1.4.0] (2022-04-04)

NOTES:

 - Update readme using github-script@v5 by @krrrr38 in ([#135](https://github.com/hashicorp/setup-terraform/pull/135))
 - Update actions/github-script to v6 in README by @shouichi in ([#148](https://github.com/hashicorp/setup-terraform/pull/148))

ENHANCEMENTS:

 - Improve output for PR comment by @skpy in ([#129](https://github.com/hashicorp/setup-terraform/pull/129))
 - Allow proxy values to be set by @rabun788 in ([#147](https://github.com/hashicorp/setup-terraform/pull/147))

INTERNAL:

 - Allow dependabot to check node modules by @jlosito in ([#87](https://github.com/hashicorp/setup-terraform/pull/87))
 - Update js-releases to v1.4.0 by @aeschright in ([#111](https://github.com/hashicorp/setup-terraform/pull/111))
 - Updates Readme by @ndrone-kr in ([#86](https://github.com/hashicorp/setup-terraform/pull/86))
 - Update husky to v6.0 by @aeschright in ([#113](https://github.com/hashicorp/setup-terraform/pull/113))
 - Bump development dependencies by @jpogran in ([#153](https://github.com/hashicorp/setup-terraform/pull/153))
 - Bump node-fetch from 2.6.1 to 2.6.7 by @dependabot in ([#154](https://github.com/hashicorp/setup-terraform/pull/154))
 - Bump @actions/github from 4.0.0 to 5.0.0 by @dependabot in ([#114](https://github.com/hashicorp/setup-terraform/pull/114))
 - Bump @actions/io from 1.1.0 to 1.1.1 by @dependabot in ([#156](https://github.com/hashicorp/setup-terraform/pull/156))
 - Bump @actions/core from 1.2.7 to 1.6.0 by @dependabot in ([#158](https://github.com/hashicorp/setup-terraform/pull/158))
 - Bump @actions/tool-cache from 1.6.1 to 1.7.1 by @dependabot in ([#159](https://github.com/hashicorp/setup-terraform/pull/159))
 - Bump @actions/core from 1.2.7 to 1.6.0 by @jpogran in ([#160](https://github.com/hashicorp/setup-terraform/pull/160))
 - Bump @actions/exec from 1.0.4 to 1.1.0 by @jpogran in ([#161](https://github.com/hashicorp/setup-terraform/pull/161))
 - Bump @actions/io from 1.1.0 to 1.1.1 by @jpogran in ([#162](https://github.com/hashicorp/setup-terraform/pull/162))
 - Bump @hashicorp/js-releases from 1.5.0 to 1.5.1 by @dependabot in ([#166](https://github.com/hashicorp/setup-terraform/pull/166))
 - Bump minimist from 1.2.5 to 1.2.6 by @dependabot in ([#168](https://github.com/hashicorp/setup-terraform/pull/168))
 - Bump @actions/tool-cache from 1.7.1 to 1.7.2 by @dependabot in ([#164](https://github.com/hashicorp/setup-terraform/pull/164))
 - Bump @actions/io from 1.1.1 to 1.1.2 by @dependabot in ([#165](https://github.com/hashicorp/setup-terraform/pull/165))
 - Bump minimist from 1.2.5 to 1.2.6 in /wrapper by @dependabot in ([#169](https://github.com/hashicorp/setup-terraform/pull/169))
 - Add GitHub automatic release by @jpogran in ([#173](https://github.com/hashicorp/setup-terraform/pull/173))

# [1.3.2] (2020-12-09)

ENHANCEMENTS:

 - Update js-releases to fix missing dep in bundle ([#78](https://github.com/hashicorp/setup-terraform/pull/78))

# [1.3.1] (2020-12-08)

BUG FIXES:

 - Fix build dependency ([#76](https://github.com/hashicorp/setup-terraform/pull/76))

# [1.3.0] (2020-12-08)

ENHANCEMENTS:

 - Use `@hashicorp/js-releases` package to identify and download the specified version of Terraform. This will ensure that our tooling is consistent in how it works with the releases API, especially when handling pre-releases. ([#70](https://github.com/hashicorp/setup-terraform/pull/70), [#73](https://github.com/hashicorp/setup-terraform/pull/73))

# [1.2.1] (2020-10-30)

INTERNAL:

 - Update dependencies to resolve CVE-2020-15228 ([#63](https://github.com/hashicorp/setup-terraform/pull/63))

# [1.2.0]

ENHANCEMENTS:

 - Allow `terraform_version` to take a version constraint. ([#38](https://github.com/hashicorp/setup-terraform/pull/38))

# [1.1.0]

ENHANCEMENTS:

 - Ignore pre-release versions when `terraform_version` is set to `latest`. ([#19](https://github.com/hashicorp/setup-terraform/pull/19))

# [1.0.1]

INTERNAL:

 - Bump @actions/http-client from 1.0.6 to 1.0.8. ([#1](https://github.com/hashicorp/setup-terraform/pull/1))

# [1.0.0]

 - Initial release.

<!-- Links to tag comparisons -->
[Unreleased]: https://github.com/hashicorp/setup-terraform/compare/v2.0.0...main
[2.0.0]: https://github.com/hashicorp/setup-terraform/compare/v1.4.0...v2.0.0
[1.4.0]: https://github.com/hashicorp/setup-terraform/compare/v1.3.2...v1.4.0
[1.3.2]: https://github.com/hashicorp/setup-terraform/compare/v1.3.1...v1.3.2
[1.3.1]: https://github.com/hashicorp/setup-terraform/compare/v1.3.0...v1.3.1
[1.3.0]: https://github.com/hashicorp/setup-terraform/compare/v1.2.1...v1.3.0
[1.2.1]: https://github.com/hashicorp/setup-terraform/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/hashicorp/setup-terraform/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/hashicorp/setup-terraform/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/hashicorp/setup-terraform/compare/v1.0.0...v1.0.1
