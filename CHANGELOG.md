## 3.1.1 (2024-05-07)

BUG FIXES:

* wrapper: Fix wrapper to output to stdout and stderr immediately when data is received ([#395](https://github.com/hashicorp/setup-terraform/issues/395))

## 3.1.0 (2024-04-23)

ENHANCEMENTS:

* Automatically fallback to darwin/amd64 for Terraform versions before 1.0.2 as releases for darwin/arm64 are not available ([#409](https://github.com/hashicorp/setup-terraform/issues/409))

## 3.0.0 (2023-10-30)

NOTES:

* Updated default runtime to node20 ([#346](https://github.com/hashicorp/setup-terraform/issues/346))
* The wrapper around the installed Terraform binary has been fixed to return the exact STDOUT and STDERR from Terraform when executing commands. Previous versions of setup-terraform may have required workarounds to process the STDOUT in bash, such as filtering out the first line or selectively parsing STDOUT with jq. These workarounds may need to be adjusted with `v3.0.0`, which will now return just the STDOUT/STDERR from Terraform with no errant characters/statements. ([#367](https://github.com/hashicorp/setup-terraform/issues/367))

BUG FIXES:

* Fixed malformed stdout when wrapper is enabled ([#367](https://github.com/hashicorp/setup-terraform/issues/367))

# [2.0.3] (2022-11-01)

### NOTES

* Reduced occurrences of GitHub Actions warnings for setting output [#247](https://github.com/hashicorp/setup-terraform/pull/247)

# [2.0.2] (2022-10-12)

### BUG FIXES

* Update 2.0.1 release metadata by @jpogran in https://github.com/hashicorp/setup-terraform/pull/253
* `README.md` updates - direct links to license and code of conduct, updated GitHub documents link by @magnetikonline in https://github.com/hashicorp/setup-terraform/pull/244

### INTERNAL

* Bump jest from 29.0.3 to 29.1.2 by @dependabot in https://github.com/hashicorp/setup-terraform/pull/248

# [2.0.1] (2022-10-12)

### ENHANCEMENTS

* Do not fail when theres an exit-code 2 by @dannyibishev in https://github.com/hashicorp/setup-terraform/pull/125
* Updated README to reflect GitHub limitations by @rnsc in https://github.com/hashicorp/setup-terraform/pull/205

### BUG FIXES

* Fix terraform extract by @cpc-camarj in https://github.com/hashicorp/setup-terraform/pull/187
* Add new-style readme build badges, bump `actions/checkout` in `README.md` examples by @magnetikonline in https://github.com/hashicorp/setup-terraform/pull/188
* Fixed `master` to `main` workflow branch triggers by @magnetikonline in https://github.com/hashicorp/setup-terraform/pull/216
* Fix the example of how to comment on pull request. by @acarmel in https://github.com/hashicorp/setup-terraform/pull/220

### INTERNAL

* Bump @actions/core from 1.6.0 to 1.7.0 by @dependabot in https://github.com/hashicorp/setup-terraform/pull/185
* Bump @vercel/ncc from 0.33.3 to 0.33.4 by @dependabot in https://github.com/hashicorp/setup-terraform/pull/182
* Bump jest from 27.5.1 to 28.0.0 by @dependabot in https://github.com/hashicorp/setup-terraform/pull/184
* Bump jest from 28.0.0 to 28.0.3 by @dependabot in https://github.com/hashicorp/setup-terraform/pull/190
* Bump husky from 7.0.4 to 8.0.1 by @dependabot in https://github.com/hashicorp/setup-terraform/pull/193
* Bump jest from 28.0.3 to 28.1.0 by @dependabot in https://github.com/hashicorp/setup-terraform/pull/194
* Bump @actions/github from 5.0.1 to 5.0.3 by @dependabot in https://github.com/hashicorp/setup-terraform/pull/201
* Bump @actions/core from 1.7.0 to 1.8.2 by @dependabot in https://github.com/hashicorp/setup-terraform/pull/200
* Bump @actions/tool-cache from 1.7.2 to 2.0.1 by @dependabot in https://github.com/hashicorp/setup-terraform/pull/199
* TF DevEx: repo adoption by @detro in https://github.com/hashicorp/setup-terraform/pull/204
* Bump nock from 13.2.4 to 13.2.6 by @dependabot in https://github.com/hashicorp/setup-terraform/pull/212
* Bump @vercel/ncc from 0.33.4 to 0.34.0 by @dependabot in https://github.com/hashicorp/setup-terraform/pull/210
* Bump jest from 28.1.0 to 28.1.1 by @dependabot in https://github.com/hashicorp/setup-terraform/pull/215
* Bump nock from 13.2.6 to 13.2.7 by @dependabot in https://github.com/hashicorp/setup-terraform/pull/217
* Bump jest from 28.1.1 to 28.1.2 by @dependabot in https://github.com/hashicorp/setup-terraform/pull/221
* Bump jest from 28.1.2 to 28.1.3 by @dependabot in https://github.com/hashicorp/setup-terraform/pull/224
* Bump nock from 13.2.7 to 13.2.9 by @dependabot in https://github.com/hashicorp/setup-terraform/pull/225
* Bump leonsteinhaeuser/project-beta-automations from 1.2.1 to 1.3.0 by @dependabot in https://github.com/hashicorp/setup-terraform/pull/233
* Bump leonsteinhaeuser/project-beta-automations from 1.3.0 to 2.0.0 by @dependabot in https://github.com/hashicorp/setup-terraform/pull/243
* Bump jest from 28.1.3 to 29.0.3 by @dependabot in https://github.com/hashicorp/setup-terraform/pull/242
* Bump @hashicorp/js-releases from 1.5.1 to 1.6.1 by @dependabot in https://github.com/hashicorp/setup-terraform/pull/226
* Bump @actions/core from 1.8.2 to 1.9.1 by @dependabot in https://github.com/hashicorp/setup-terraform/pull/235
* Bump @actions/core from 1.6.0 to 1.9.1 in /wrapper by @dependabot in https://github.com/hashicorp/setup-terraform/pull/236
* Bump @actions/github from 5.0.3 to 5.1.1 by @dependabot in https://github.com/hashicorp/setup-terraform/pull/249
* Bump leonsteinhaeuser/project-beta-automations from 2.0.0 to 2.0.1 by @dependabot in https://github.com/hashicorp/setup-terraform/pull/250

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
[Unreleased]: https://github.com/hashicorp/setup-terraform/compare/v2.0.2...main
[2.0.2]: https://github.com/hashicorp/setup-terraform/compare/v2.0.1...v2.0.2
[2.0.1]: https://github.com/hashicorp/setup-terraform/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/hashicorp/setup-terraform/compare/v1.4.0...v2.0.0
[1.4.0]: https://github.com/hashicorp/setup-terraform/compare/v1.3.2...v1.4.0
[1.3.2]: https://github.com/hashicorp/setup-terraform/compare/v1.3.1...v1.3.2
[1.3.1]: https://github.com/hashicorp/setup-terraform/compare/v1.3.0...v1.3.1
[1.3.0]: https://github.com/hashicorp/setup-terraform/compare/v1.2.1...v1.3.0
[1.2.1]: https://github.com/hashicorp/setup-terraform/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/hashicorp/setup-terraform/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/hashicorp/setup-terraform/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/hashicorp/setup-terraform/compare/v1.0.0...v1.0.1
