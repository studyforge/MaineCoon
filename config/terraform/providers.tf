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
    bucket = "s3-mainecoon-backend-terraform-tfstate"
    key    = ".tfstate"
    region = "eu-west-3"
  }
}

provider "aws" {
  region = var.region
}

provider "docker" {}

provider "kubernetes" {
  host        = aws_eks_cluster.mainecoon.endpoint
  config_path = "~/.kube/config"
}