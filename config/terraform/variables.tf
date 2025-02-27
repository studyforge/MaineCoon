variable "token" {
  description = "Digital Ocean API token"
  type        = string
  sensitive   = true
}

variable "region" {
  description = "Digital Ocean region"
  type        = string
  default     = "fra1"
}

variable "machine_type" {
  description = "Kubernetes node size"
  type        = string
  default     = "s-2vcpu-2gb"
}