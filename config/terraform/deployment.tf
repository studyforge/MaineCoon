resource "kubernetes_deployment" "maineCoon" {
  metadata {
    name = "maineCoon"
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = "maineCoon"
      }
    }

    template {
      metadata {
        labels = {
          app = "maineCoon"
        }
      }

      spec {
        container {
          image = "gabyorel/mainecoon-app:ui-develop"
          name  = "maineCoon-ui"

          liveness_probe {
            http_get {
              path = "/"
              port = 3334

              http_header {
                name  = "X-Custom-Header"
                value = "Awesome"
              }
            }

            initial_delay_seconds = 3
            period_seconds        = 3
          }
        }

         container {
          image = "gabyorel/mainecoon-app:api-develop"
          name  = "maineCoon-ui"

          liveness_probe {
            http_get {
              path = "/"
              port = 3333

              http_header {
                name  = "X-Custom-Header"
                value = "Awesome"
              }
            }

            initial_delay_seconds = 3
            period_seconds        = 3
          }
        }
      }
    }
  }
}