variable "region" {
  description = "AWS region"
  type        = string
  default     = "eu-west-3"
}

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