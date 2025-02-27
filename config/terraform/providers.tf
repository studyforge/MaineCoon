terraform {
  required_providers {
    digitalocean = {
      source = "digitalocean/digitalocean"
      version = "~> 2.49"
    }
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