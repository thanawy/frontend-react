provider "kubernetes" {
  config_path    = "~/.kube/config"
}

provider "helm" {
  kubernetes {
    config_path = "~/.kube/config" # or provide the cluster details directly
  }
}

terraform {
  required_version = ">= 0.13"

  required_providers {
    kubectl = {
      source  = "gavinbunney/kubectl"
      version = ">= 1.7.0"
    }
  }

  backend "kubernetes" {
    secret_suffix    = "frontend-next-state"
    config_path      = "~/.kube/config"
  }
}