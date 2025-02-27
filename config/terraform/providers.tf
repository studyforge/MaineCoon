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

import {
  id = "07daeb87-719e-41db-be57-14b04eae3f73"
  to = digitalocean_vpc.mainecoon
}

import {
  id = "b8ecd2ab-2267-4a5e-8692-cbf1d32583e3"
  to = digitalocean_database_firewall.k8s_access
}

import {
  id = "c416ce8e-f731-4521-b7ab-54877ab55ec6"
  to = digitalocean_kubernetes_cluster.mainecoon
}

import {
  id = "4aa687c8-7517-4c58-af03-455d85a13360"
  to = digitalocean_database_cluster.mainecoon
}