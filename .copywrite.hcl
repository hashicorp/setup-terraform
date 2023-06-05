schema_version = 1

project {
  license        = "MPL-2.0"
  copyright_year = 2020

  header_ignore = [
    # changie tooling configuration and CHANGELOG entries (prose)
    ".changes/unreleased/*.yaml",
    ".changie.yaml",

    # GitHub issue template configuration
    ".github/ISSUE_TEMPLATE/*.yml",

    # GitHub Actions workflow-specific configurations
    ".github/labeler-*.yml",

    # Github Action linting configuration
    ".github/actionlint.yaml",

    # Release Engineering tooling configuration
    ".release/*.hcl",

    # Auto-generated /dist
    "dist/**",

    # GitHub Action metadata file
    "action.yml",
  ]
}
