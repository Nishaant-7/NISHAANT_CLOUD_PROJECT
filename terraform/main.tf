# Infrastructure as Code (IaC) for MSU Final Project
# This file defines the cloud resources required for the CGPA Planner

terraform {
  required_providers {
    netlify = {
      source  = "azavea/netlify"
      version = "~> 0.2"
    }
  }
}

provider "netlify" {
  token = var.netlify_token
}

# Define the Netlify Site Resource
resource "netlify_site" "cgpa_planner" {
  name = "msu-cgpa-planner-pro"

  repo {
    provider    = "github"
    repo_path   = "Nishaant-7/NISHAANT_CLOUD_PROJECT"
    branch      = "main"
    cmd         = "npm run build"
    dir         = "/"
  }
}