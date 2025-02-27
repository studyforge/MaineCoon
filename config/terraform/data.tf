data "digitalocean_kubernetes_versions" "cluster" {}

data "digitalocean_kubernetes_cluster" "mainecoon" {
  name = digitalocean_kubernetes_cluster.mainecoon.name
}