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
          port {
            container_port = 8080
          }
        }

         container {
          image = "gabyorel/mainecoon-app:api-develop"
          name  = "maineCoon-api"
          port {
            container_port = 3333
          }
        }
      }
    }
  }
}