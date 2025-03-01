terraform {
  required_providers {
    digitalocean = {
      source = "digitalocean/digitalocean"
      version = "~> 2.49"
    }
  }

  backend "s3" {
    endpoints = {
      s3 = "https://mainecoon.fra1.digitaloceanspaces.com"
    }

    bucket = "mainecoon"
    key    = "iac/terraform.tfstate"

    # Deactivate a few AWS-specific checks
    skip_credentials_validation = true
    skip_requesting_account_id  = true
    skip_metadata_api_check     = true
    skip_region_validation      = true
    skip_s3_checksum            = true
    region                      = "us-east-1"
  }
}

provider "digitalocean" {
  token = var.token
}

provider "kubernetes" {
  host                   = data.digitalocean_kubernetes_cluster.mainecoon.endpoint
  cluster_ca_certificate = base64decode(data.digitalocean_kubernetes_cluster.mainecoon.kube_config[0].cluster_ca_certificate)
  token                  = data.digitalocean_kubernetes_cluster.mainecoon.kube_config[0].token
}