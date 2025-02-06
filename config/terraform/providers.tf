terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.84.0"
    }

    docker = {
      source = "docker/docker"
      version = "~> 0.4.1"
    }
  }

    backend "s3" {
    bucket = "s3-backend-tffiles"
    key    = ".tfstate"
    region = "us-east-1"
  }
}

provider "aws" {
  region = "us-east-1"
}

provider "docker" {}
