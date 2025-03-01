resource "digitalocean_vpc" "mainecoon" {
  name     = "mainecoon"
  region   = var.region
  ip_range = "10.132.0.0/16"
}

resource "digitalocean_kubernetes_cluster" "mainecoon" {
  name          = "mainecoon"
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
  name                 = "mainecoon"
  engine               = "pg"
  version              = "17"
  size                 = "db-s-1vcpu-1gb"
  region               = var.region
  private_network_uuid = digitalocean_vpc.mainecoon.id
  node_count           = 1
}

resource "digitalocean_database_db" "mainecoon" {
  cluster_id = digitalocean_database_cluster.mainecoon.id
  name       = "mainecoon"
}

resource "digitalocean_database_firewall" "k8s_access" {
  cluster_id = digitalocean_database_cluster.mainecoon.id

  rule {
    type  = "k8s"
    value = digitalocean_kubernetes_cluster.mainecoon.id
  }
}