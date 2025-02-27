resource "kubernetes_deployment" "mainecoon" {
  metadata {
    name = "mainecoon"
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = "mainecoon"
      }
    }

    template {
      metadata {
        labels = {
          app = "mainecoon"
        }
      }

      spec {
        node_selector = {
          "doks.digitalocean.com/node-pool" = "app"
        }

        container {
          image = "gabyorel/mainecoon-app:ui-develop"
          name  = "mainecoon-ui"
          port {
            container_port = 8080
          }
        }

        container {
          image = "gabyorel/mainecoon-app:api-develop"
          name  = "mainecoon-api"
          port {
            container_port = 3333
          }
        }
      }
    }
  }

  depends_on = [ digitalocean_kubernetes_node_pool.app ]
}

resource "kubernetes_service" "mainecoon_ui" {
  metadata {
    name = "mainecoon-ui"
  }

  spec {
    selector = {
      app = "mainecoon"
    }

    port {
      port        = 80
      target_port = 8080
    }

    type = "LoadBalancer"
  }
}