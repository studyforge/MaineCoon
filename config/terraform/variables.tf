variable "namespace" {
  type        = string
  description = "Docker Namespace"
}

variable "rds_username" {
  type        = string
}

variable "rds_password" {
  type        = string
}

variable "rds_db_name" {
  type        = string
}

variable "cluster_name" {
  type        = string
}