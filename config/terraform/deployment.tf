resource "random_string" "app_key" {
  length  = 16
  upper   = false
  lower   = true
  special = false
  numeric = false 
}

resource "kubernetes_deployment" "backend" {
  depends_on = [ digitalocean_kubernetes_node_pool.app ]

  metadata {
    name = "backend"
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        "app"   = "api"
        "tier"  = "backend"
        "track" = "stable" 
      }
    }

    template {
      metadata {
        labels = {
          "app"   = "api"
          "tier"  = "backend"
          "track" = "stable"
        }
      }

      spec {
        node_selector = {
          "doks.digitalocean.com/node-pool" = "app"
        }

        container {
          image             = "gabyorel/mainecoon-app:api-develop"
          image_pull_policy = "Always"
          name              = "api"

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
            value = digitalocean_database_cluster.mainecoon.private_host
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

          env {
            name  = "NODE_TLS_REJECT_UNAUTHORIZED"
            value = 0
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "backend" {
  depends_on = [ kubernetes_deployment.backend ]

  metadata {
    name = "api"
  }

  spec {
    selector = {
      "app" = "api"
      "tier" = "backend"
    }

    port {
      protocol    = "TCP"
      port        = 80
      target_port = var.api_port
    }
  }
}


resource "kubernetes_deployment" "frontend" {
  depends_on = [ digitalocean_kubernetes_node_pool.app ]

  metadata {
    name = "frontend"
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        "app"   = "frontend"
        "tier"  = "frontend"
        "track" = "stable"
      }
    }

    template {
      metadata {
        labels = {
          "app"   = "frontend"
          "tier"  = "frontend"
          "track" = "stable"
        }
      }

      spec {
        node_selector = {
          "doks.digitalocean.com/node-pool" = "app"
        }

        container {
          image             = "gabyorel/mainecoon-app:ui-develop"
          image_pull_policy = "Always"
          name              = "frontend"

          port {
            container_port = 80
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "frontend" {
  depends_on = [ kubernetes_deployment.frontend ]

  metadata {
    name = "frontend"
    annotations = {
      "service.beta.kubernetes.io/do-loadbalancer-name" = "mainecoon-app"
      "service.beta.kubernetes.io/do-loadbalancer-protocol" = "http"
      "service.beta.kubernetes.io/do-loadbalancer-http-ports" = "80"
    }
  }

  spec {
    selector = {
      "app"  = "frontend"
      "tier" = "frontend"
    }

    port {
      protocol    = "TCP"
      port        = 80
      target_port = 80
    }

    type = "LoadBalancer"
  }
}