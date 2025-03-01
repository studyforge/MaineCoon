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
            container_port = var.api_port
          }

          env {
            name  = "TZ"
            value = "Europe/Paris"
          }

          env {
            name  = "PORT"
            value = var.api_port
          }

          env {
            name  = "HOST"
            value = "0.0.0.0"
          }

          env {
            name  = "LOG_LEVEL"
            value = "info"
          }

          env {
            name  = "DB_HOST"
            value = digitalocean_database_cluster.mainecoon.host
          }

          env {
            name  = "DB_PORT"
            value = digitalocean_database_cluster.mainecoon.port
          }

          env {
            name  = "DB_USER"
            value = digitalocean_database_cluster.mainecoon.user
          }

          env {
            name  = "DB_PASSWORD"
            value = digitalocean_database_cluster.mainecoon.password
          }

          env {
            name  = "DB_DATABASE"
            value = digitalocean_database_db.mainecoon.name
          }
        }
      }
    }
  }

  depends_on = [ digitalocean_kubernetes_node_pool.app ]
}

resource "kubernetes_service" "mainecoon" {
  metadata {
    name = "mainecoon"
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

  depends_on = [ kubernetes_deployment.mainecoon ]
}