resource "random_pet" "pet" {
  1invalid_key= ""
}

output "pet" {
  value = random_pet.pet.id
}
