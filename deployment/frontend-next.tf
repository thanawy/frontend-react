resource "kubernetes_namespace" "frontend-next" {
  metadata {
    name = "frontend-next"
  }
}

variable "image" {
  default = "harbor.thanawy.com/library/frontend-next:latest"
}

resource "kubernetes_deployment" "frontend" {
  metadata {
    name      = "frontend-deployment"
    namespace = kubernetes_namespace.frontend-next.id
    labels = {
      app = "frontend"
    }
  }

  spec {
    replicas = 3

    selector {
      match_labels = {
        app = "frontend"
      }
    }

    template {
      metadata {
        labels = {
          app = "frontend"
        }
      }

      spec {
        container {
          name  = "frontend"
          image = var.image
          liveness_probe {
            http_get {
              path = "/health"
              scheme = "HTTP"
              port = "3000"
            }
          }
          readiness_probe {
            http_get {
              path = "/health"
              scheme = "HTTP"
              port = "3000"
            }
          }
          port {
            container_port = 3000
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "frontend" {
  metadata {
    name      = "frontend-service"
    namespace = kubernetes_namespace.frontend-next.id
    labels = {
      app = "frontend"
    }
  }

  spec {
    type = "ClusterIP"
    selector = {
      app = "frontend"
    }

    port {
      name        = "http"
      protocol    = "TCP"
      port        = 80
      target_port = 3000
    }
  }
}

resource "kubernetes_ingress_v1" "frontend" {
  metadata {
    name      = "frontend-ingress"
    namespace = kubernetes_namespace.frontend-next.id
    annotations = {
      "cert-manager.io/cluster-issuer"                  = "letsencrypt-prod",
      "nginx.ingress.kubernetes.io/from-to-www-redirect"  = "true"
    }
  }

  spec {
    ingress_class_name = "nginx"
    rule {
      host = "www.thanawy.com"
      http {
        path {
          path = "/"
          path_type = "Prefix"
          backend {
            service {
              name = kubernetes_service.frontend.metadata[0].name
              port {
                number = 80
              }
            }
          }
        }
      }
    }
    tls {
      hosts = ["thanawy.com", "www.thanawy.com"]
      secret_name = "frontend-cert-prod"
    }
  }
}