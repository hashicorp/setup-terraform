resource "null_resource" "null" {
  triggers = {
    value = "${timestamp()}"
  }
}
