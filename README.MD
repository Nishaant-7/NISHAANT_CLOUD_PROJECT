# Cloud Computing Final Project: Student CGPA Planner

## Project Description
For our Cloud Computing final project (Option 2: DevOps CI/CD Workflow), I developed a "University CGPA Planner." The main focus of this submission is not just the web application itself, but the automation pipeline behind it.

I configured GitHub Actions to handle the entire lifecycle—from building the code to testing it, and finally deploying it live to Netlify without manual intervention. Thanks for the guidance provide by our Best lecture DR JAMAL.

## CI/CD Pipeline Implementation
We set up a workflow using GitHub Actions that triggers whenever code is pushed to the repository. Here is what the automation handles:

* **Build & Install:** The workflow installs all necessary dependencies (npm) and builds the project.
* **Automated Testing:** We integrated Jest unit tests. If the code breaks or fails a test, the deployment is stopped immediately to prevent bad code from going live.
* **Security Check:** The pipeline runs an `npm audit` to scan for any security vulnerabilities in the packages we used.
* **Continuous Deployment:** Once all tests pass, the site is automatically deployed to Netlify (simulating our Cloud/CDN storage).

## Tools & Technologies Used
* **Frontend:** HTML, CSS (Glassmorphism UI), and vanilla JavaScript.
* **CI/CD Tool:** GitHub Actions (YAML configuration).
* **Cloud Hosting:** Netlify.
* **Storage:** We used LocalStorage so students don't lose their data upon refreshing the page.
* **Developed by Nishaant Thana Segaran.

## Submission Checklist
- [x] GitHub Repository with documentation
- [x] Functional CI/CD Pipeline (Build -> Test -> Deploy)
- [x] Unit Testing & Security Audit steps included
- [x] Live URL for the web app

## Live Deployment
You can access the hosted application here:
https://nishaant-cloud-project-cgpa.netlify.app/

## Group Members
* **[NISHAANT THANA SEGARAN]**
* **[MHMD ZAID]**