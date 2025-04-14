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


## 🔧 Prerequisites: Install Docker & AWS CLI

Before starting the CI/CD setup, you must install **Docker** and configure the **AWS CLI**.

---

## 🐳 Docker Installation Guide

This project uses Docker to containerize the Ping Pong game. Choose your OS below and follow the instructions:

---

### 🪟 Docker Installation on Windows

#### ✅ Check System Requirements
- Windows 10/11 (64-bit): Pro, Enterprise, or Education edition
- WSL2 backend (Windows Subsystem for Linux 2) must be enabled

#### 📥 Download Docker Desktop
- Visit the [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/) page
- Download and run the installer

#### ⚙️ Install Docker Desktop
- Follow the on-screen instructions
- Ensure WSL2 backend is selected during setup

#### ⚙️ Configure Docker
- Launch Docker Desktop
- Navigate to `Settings > Resources > WSL Integration`
- Enable your WSL distributions

#### 🔍 Verify Docker Installation

Open PowerShell or Command Prompt and run:

```bash
docker --version


---

### 🐧 Docker Installation on Linux (Ubuntu/Debian)

#### 🔄 Remove Old Docker Versions (if any)

```bash
sudo apt-get remove docker docker-engine docker.io containerd runc
```

### 🐧 Docker Installation on Linux (Ubuntu/Debian)

#### 🔄 Remove Old Docker Versions (if any)

```bash
sudo apt-get remove docker docker-engine docker.io containerd runc
```

#### 🛠️ Set Up Docker Repository

Update your system:

```bash
sudo apt-get update
```

Install dependencies:

```bash
sudo apt-get install ca-certificates curl gnupg
```

Add Docker’s GPG key and repository:

```bash
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo \
"deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
https://download.docker.com/linux/ubuntu \
$(lsb_release -cs) stable" | \
sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

#### 📦 Install Docker Engine

```bash
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

#### 🚀 Start Docker & Verify Installation

Start Docker:

```bash
sudo systemctl start docker
```

Test Docker:

```bash
sudo docker run hello-world
```

#### 🙌 Optional: Run Docker Without `sudo`

```bash
sudo usermod -aG docker $USER
```

Log out and log back in to apply the changes.

---

### 🍏 Docker Installation on macOS

#### ✅ Check System Requirements
- macOS Monterey (12) or later is recommended
- Virtualization must be enabled

#### 📥 Download Docker Desktop
- Visit the [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop/) page
- Choose the correct version for your system (Intel or Apple Silicon)

#### ⚙️ Install Docker Desktop
- Open the `.dmg` installer
- Drag Docker to the **Applications** folder
- Launch Docker and complete the onboarding steps

#### 🔍 Verify Docker Installation

Open the **Terminal** and run:

```bash
docker --version
```

Test Docker functionality:

```bash
docker run hello-world
```

---

Here’s the **Configure AWS CLI** section formatted in **Markdown** for your README:

---


## 🔧 Configure AWS CLI

The **AWS Command Line Interface (CLI)** allows you to interact with AWS services directly from your terminal. Follow the steps below to install and configure the AWS CLI on your system.

---

### 🪟 AWS CLI Installation on Windows

#### 📥 Download and Install AWS CLI
- Go to the [AWS CLI Download page](https://aws.amazon.com/cli/)
- Download the latest **Windows Installer** (.msi file)
- Run the installer and follow the instructions

#### 🔍 Verify Installation
Once installed, open **Command Prompt (cmd)** and run:

```bash
aws --version
```

You should see something like:

```bash
aws-cli/2.x.x Python/3.x.x Windows/10
```

If this appears, the installation was successful!

---

### 🍏 AWS CLI Installation on macOS

#### 📥 Install AWS CLI
- Open the **Terminal** app
- Install AWS CLI using **Homebrew** (recommended):

```bash
brew install awscli
```

#### 🔍 Verify Installation
Run the following command in **Terminal**:

```bash
aws --version
```

If it displays the version number, the installation is complete!

---

### 🐧 AWS CLI Installation on Linux

#### 📥 Download and Install AWS CLI
Open the **Terminal** and run:

```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

#### 🔍 Verify Installation
Check the AWS CLI version by running:

```bash
aws --version
```

If you see the version number, the installation was successful!
```

Here’s the **Create or Retrieve AWS Credentials** and **Configure AWS CLI** section formatted in **Markdown** for your README:

---

```
## 🔑 Create or Retrieve AWS Credentials

To configure AWS CLI, you’ll need an **AWS Access Key ID** and **AWS Secret Access Key**. Follow the steps below to create or retrieve your credentials:

---

### ✅ If You Already Have an IAM User:

1. Log in to the [AWS Management Console](https://aws.amazon.com/console/).
2. Navigate to **IAM** (Identity and Access Management).
3. Click on **Users** in the left sidebar.
4. Select your **username**.
5. Go to the **Security credentials** tab.
6. Under **Access keys**, you will find your keys (or generate new ones if needed).

---

### 🚀 If You Don’t Have an IAM User Yet:

1. Log in to the **AWS Console**.
2. Open the **IAM** service.
3. Click on **Users** → **Add user**.
4. Set a **username** and check **Programmatic access**.
5. Assign a **permission policy** (e.g., "AdministratorAccess" or custom permissions).
6. Click **Create user** and download the generated `.csv` file with your username and password.
7. Go back to the **user list** → click on your created user → go to **Security credentials** → click **Create access key**.
8. Download the `.csv` file containing the **Access Key ID** and **Secret Access Key** for AWS CLI.

> 📌 **Important:** Keep your **secret access key** safe! If lost, you cannot retrieve it—only regenerate a new one.

---

## ⚙️ Configure AWS CLI

Now that you have your credentials, let’s set up the AWS CLI:

1. Open a **Terminal** (or **Command Prompt** on Windows).
2. Run the configuration command:

```bash
aws configure
```

3. You’ll be prompted to enter the following details:

- **AWS Access Key ID:** Enter your access key.
- **AWS Secret Access Key:** Enter your secret key.
- **Default region name:** Enter your preferred region (e.g., `us-east-1`, `ap-south-1` for India).
- **Default output format:** Leave this blank (default) or choose `json`, `table`, or `text`.

---

Once completed, your **AWS CLI** is successfully configured and ready to use!

```

---



