terraform {
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "3.5.2"
    }
  }
}

provider "vercel" {
  api_token = var.vercel_api_token
}

variable "vercel_api_token" {}

resource "vercel_project" "reverse_proxy" {
  name       = "reverse-proxy"
  framework  = "other"
  git_repository = {
    type = "hieudoanm"
    repo = "nothing"
  }
}

data "vercel_project_directory" "reverse_proxy_directory" {
  path = "packages/backend/serverless/reverse-proxy/go.dev/http"
}

resource "vercel_deployment" "reverse_proxy_deployment" {
  project_id = vercel_project.reverse_proxy.id
  files = data.vercel_project_directory.reverse_proxy_directory.files
  path_prefix = "."
  production  = true
}

resource "vercel_project_domain" "reverse_proxy_domain" {
  project_id = vercel_project.reverse_proxy.id
  domain     = "hieudoanm-reverse-proxy.vercel.app"
}
