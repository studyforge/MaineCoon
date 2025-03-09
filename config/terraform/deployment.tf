resource "random_string" "app_key" {
  length  = 16
  upper   = false
  lower   = true
  special = false
  numeric = false 
}

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
          image             = "gabyorel/mainecoon-app:ui-develop"
          image_pull_policy = "Always"
          name              = "mainecoon-ui"

          port {
            container_port = 80
          }
        }

        container {
          image             = "gabyorel/mainecoon-app:api-develop"
          image_pull_policy = "Always"
          name              = "mainecoon-api"

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
            name  = "APP_KEY"
            value = random_string.app_key.result
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
    annotations = {
      "service.beta.kubernetes.io/do-loadbalancer-name" = "mainecoon-app"
      "service.beta.kubernetes.io/do-loadbalancer-protocol" = "http"
      "service.beta.kubernetes.io/do-loadbalancer-http-ports" = "80"
    }
  }

  spec {
    selector = {
      app = "mainecoon"
    }

    port {
      port        = 80
      target_port = 80
    }

    port {
      port        = var.api_port
      target_port = var.api_port
    }

    type = "LoadBalancer"
  }

  depends_on = [ kubernetes_deployment.mainecoon ]
}