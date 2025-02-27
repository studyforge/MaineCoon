resource "digitalocean_vpc" "mainecoon" {
  name     = "mainecoon-vpc"
  region   = var.region
  ip_range = "10.128.0.0/16"
}

resource "digitalocean_kubernetes_cluster" "mainecoon" {
  name          = "mainecoon-cluster"
  region        = var.region
  version       = data.digitalocean_kubernetes_versions.cluster.latest_version
  vpc_uuid      = digitalocean_vpc.mainecoon.id

  node_pool {
    name       = "default"
    size       = var.machine_type
    node_count = 1
  }
}

resource "digitalocean_kubernetes_node_pool" "app" {
  name       = "app"
  cluster_id = digitalocean_kubernetes_cluster.mainecoon.id
  size       = var.machine_type
  node_count = 1
  tags       = ["applications"]
}

resource "digitalocean_database_cluster" "mainecoon" {
  name       = "mainecoon-db"
  engine     = "pg"
  version    = "17"
  size       = "db-s-1vcpu-1gb"
  region     = var.region
  node_count = 1
}