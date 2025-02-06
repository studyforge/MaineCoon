terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    docker = {
      source = "docker/docker"
      version = "~> 0.4"
    }
  }

  backend "s3" {
    bucket = "s3-backend-tffiles"
    key    = ".tfstate"
    region = "us-east-1"
  }

  required_version = ">= 1.10.0"
}

provider "aws" {
  region = "us-east-1"
}

provider "docker" {}

resource "docker_hub_repository" "mainecoon-app" {
  namespace = var.namespace
  name      = "mainecoon-app"
  private   = false
}