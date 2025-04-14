# 🏓 Deploying a Ping Pong Game using AWS CI/CD Tools (CodeBuild + CodePipeline + ECS + ECR)

## 📄 Project Description

This project focuses on setting up a **CI/CD pipeline** for deploying a Dockerized version of the **2048 Ping Pong Game** to AWS. The pipeline automates the process of building, testing, and deploying the game to a scalable infrastructure using:

- **Amazon ECS**
- **Amazon ECR**
- **AWS CodePipeline**

### 🔧 Key Tasks

- 🐳 Build and push a Docker image of the Ping Pong game to **Amazon ECR**  
- 🔁 Set up a **CodePipeline** to automate the build and deploy process  
- 🚀 Deploy the Dockerized game to **Amazon ECS** using the **Fargate** launch type

### 🎯 What You'll Learn

By completing this project, you'll understand how to integrate various AWS services to create a streamlined **CI/CD workflow**, reducing manual intervention and enabling faster, more reliable application deployment.

---

## 🧰 AWS Services Used

| Service            | Description                                                                 |
|--------------------|-----------------------------------------------------------------------------|
| 🛠️ AWS CodePipeline | Orchestrates the CI/CD pipeline, automating build, test, and deployment stages |
| 🚢 Amazon ECS        | Deploys and manages containerized applications using Fargate (serverless)       |
| 📦 Amazon ECR        | Stores and manages Docker images used in ECS tasks                             |
| 🧱 AWS CodeBuild     | Handles the build phase, including Docker image creation                       |
| 🔐 IAM Roles & Policies | Provides secure access between AWS services involved in the pipeline        |

## Architecture Diagran
![image](https://github.com/user-attachments/assets/a6054913-6bca-4297-906b-42ff20aa0811)

1. Push the updated code to Github repo, which triggers the CI/CD pipeline in AWS Codepipeline.
2. CodeBuild pulls the code, builds docker image for the Ping Pong game , tags it and prepares it for deployment.
3. The built docker image is pushed to Amazon ECR as new container image with specific Tag.
4. CodePipeline uses Code Deploy to update ECS service, replacing old container with new one, ensuring the Ping Pong game runs with updated version.

