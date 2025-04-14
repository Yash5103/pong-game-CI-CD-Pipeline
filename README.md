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

---

## ⏱️ Estimated Time & Cost

- **Estimated Time:** 3–4 hours  
- **Estimated Cost:** ~$1 (based on AWS free tier + minimal usage)

---

## 🪜 Project Steps

1. **🛠️ Prerequisites**
   - Install **Docker**
   - Install and configure **AWS CLI**
   - Authenticate with AWS using `aws configure`

2. **📦 Set Up ECS Cluster and ECR Repository**
   - Create a new **ECS Cluster** (Fargate type)
   - Create a new **ECR Repository** to store Docker images

3. **🕹️ Prepare the Ping Pong Game Code**
   - Add a `Dockerfile` for containerization
   - Ensure the application is ready to run inside a container

4. **🔨 Set Up CodeBuild for Continuous Integration**
   - Create a **CodeBuild Project**
   - Provide a `buildspec.yml` to define build steps
   - Configure permissions (IAM Role) to push to ECR

5. **🚀 Set Up CodePipeline for Continuous Deployment**
   - Create a **CodePipeline**
   - Integrate CodeBuild and ECS deployment stages
   - Connect GitHub or CodeCommit repository as source

6. **🧪 Test the Pipeline**
   - Push code changes to your repo
   - Verify that the pipeline triggers automatically
   - Confirm successful ECS deployment

---

## 🧹 Clean Up Resources

To avoid ongoing charges, delete all created AWS resources:

- **🗑️ Delete CodePipeline**  
  Go to the **CodePipeline Console**, find your pipeline, and delete it.

- **🗑️ Delete CodeBuild Project**  
  In the **CodeBuild Console**, locate and delete your build project.

- **🛡️ Remove IAM Roles and Policies**  
  Delete IAM roles for **CodePipeline**, **CodeBuild**, and any **inline policies**.

- **🪣 Delete S3 Bucket (optional)**  
  If used for artifacts, delete the **S3 bucket** created during the setup.

- **📦 Delete ECR Repository**  
  Go to the **ECR Console** and delete the repository used for storing Docker images.

- **🧱 Delete ECS Services and Cluster**  
  In the **ECS Console**, remove any services or clusters related to this project.

