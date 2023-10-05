resource "terraform_data" "replacement" {
  triggers_replace = timestamp()
}
