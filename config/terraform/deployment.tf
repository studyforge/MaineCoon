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

  depends_on = [ aws_eks_node_group.node_group ]
}