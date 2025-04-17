# 🏓 Deploying a Ping Pong Game using AWS CI/CD Tools (CodeBuild + CodePipeline + ECS + ECR)

## 📄 Project Description

This project focuses on setting up a **CI/CD pipeline** for deploying a Dockerized version of the **Ping Pong Game** to AWS. The pipeline automates the process of building, testing, and deploying the game to a scalable infrastructure using:

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


##  Configure AWS CLI

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
## 1. Create or Retrieve AWS Credentials

To configure AWS CLI, you’ll need an **AWS Access Key ID** and **AWS Secret Access Key**. Follow the steps below to create or retrieve your credentials:

---

### 1.1 If You Already Have an IAM User:

1. Log in to the [AWS Management Console](https://aws.amazon.com/console/).
2. Navigate to **IAM** (Identity and Access Management).
3. Click on **Users** in the left sidebar.
4. Select your **username**.
5. Go to the **Security credentials** tab.
6. Under **Access keys**, you will find your keys (or generate new ones if needed).

---

### 1.1 If You Don’t Have an IAM User Yet:

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

## ⚙1.3 Configure AWS CLI

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
```
## 2. Set up ECS Cluster and ECR Repository

To deploy the **Ping Pong Game** using **Amazon ECS**, follow these steps:

### 2.1 Create IAM Roles and Policies

Before deploying the container, we need to set up **IAM (Identity and Access Management)** roles to give **ECS** the necessary permissions to run tasks securely.

#### 2.2 Create a Role for ECS Tasks:
1. Navigate to the **IAM Console** > **Roles** > **Create role**.
2. Select **AWS Service** > **Elastic Container Service** > **Elastic Container Service Task**.
3. Attach the following policies:
   - **AmazonECSTaskExecutionRolePolicy**
4. Name the role (e.g., `ECSTaskExecutionRole`) and click **Create Role**.

This role will allow **ECS** to pull container images from **ECR** and send logs to **CloudWatch**.

---

### 3. Create an Amazon ECR Repository

**Amazon Elastic Container Registry (ECR)** is a managed Docker container registry that helps store and manage your container images.

#### 3.1 To create an ECR repository:
1. Open the **ECR Console** in the AWS Management Console.
2. Click **Create repository**.
3. Choose the repository name (e.g., `ping-pong-game-repo`).
4. Leave the defaults for encryption unless specific encryption settings are required.
5. Click **Create repository**.
6. Copy the repository **URI** (e.g., `097670902547.dkr.ecr.ap-south-1.amazonaws.com/ping-pong-game-repo`) for later use.

---

### 4. Create an ECS Cluster

An **ECS Cluster** is responsible for managing the compute resources needed to run your tasks.

#### 4.1 To create an ECS Cluster:
1. Open the **ECS Console**.
2. Click **Clusters** > **Create Cluster**.
3. Provide a cluster name (e.g., `ping-pong-game-cluster`).
4. Choose **AWS Fargate** for a serverless setup.
5. Keep the rest as default and click **Create** to finalize the cluster.

---

### 5. Define an ECS Task Definition

A **Task Definition** is a blueprint that defines how a container should run, including the image, memory, CPU, networking, and logging.

#### 5.1 To define a Task Definition:
1. Go to the **ECS Console** > **Task Definitions** > **Create New Task Definition**.
2. Give a task definition family name (e.g., `ping-pong-task`).
3. Choose **Fargate** as the launch type.
4. Specify the following:
   - **Task Role:** Select the IAM role (`ECSTaskExecutionRole`).
   - **Container Definitions:**
     - **Container name:** `ping-pong-container`.
     - **Image:** Add the ECR URI that you copied previously (e.g., `097670902547.dkr.ecr.ap-south-1.amazonaws.com/ping-pong-game-repo:latest`).
5. Leave the rest as default.
6. Click **Create** to save the task definition.

Now, the task definition is set, and **ECS** knows how to run your container.

---

### 6. Set Up an ECS Service

An **ECS Service** ensures that your application is always running and manages the number of task instances.

#### 6.1 To set up an ECS Service:
1. Go to the **ECS Console** > **Clusters** > **ping-pong-game-cluster** > **Create Service**.
2. Choose:
   - **Launch type:** Fargate.
   - **Task definition:** Select the one created earlier.
   - **Service name:** `ping-pong-service`.
   - **Desired Number of tasks:** 1.
3. Leave everything else as default.
4. Click **Create Service**.

Your **Ping Pong Game** is now running as an **ECS Service**!

---

The next steps will guide you through preparing the **Ping Pong Game** code for deployment.

---


## 7. Prepare the Ping Pong Game Code

To deploy the **Ping Pong Game**, follow these steps:

### 7.1 Clone the Website Code

The website code for the **Ping Pong Game** is already provided. To get this code, open your preferred IDE and terminal, then run:

```bash
git clone https://github.com/Yash5103/Pong-game.git
cd PingPongGame-Dockerized-CICD
```
---

### 7.2 Run a Docker Container and Push to ECR

The cloned project includes a `Dockerfile` that defines how to containerize the **Ping Pong Game**. We'll run the container locally, then push it to **Amazon ECR**.

#### 📄 Dockerfile Overview:

```dockerfile
# Use the official Nginx image as the base
FROM nginx:latest

# Copy the Ping Pong Game files to the Nginx web root
COPY . /usr/share/nginx/html

# Expose the default Nginx HTTP port
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
```

This `Dockerfile` sets up a lightweight container using the Nginx web server to serve the **Ping Pong Game** over HTTP.

---

#### 7.3 Build the Docker Image

Make sure Docker Desktop is running, then run:

```bash
docker build -t ping-pong-game .
```

---

#### 🏷7.4 Tag the Docker Image for ECR

Replace `<ECR_URI>` with your actual ECR repository URI:

```bash
docker tag ping-pong-game:latest <ECR_URI>:latest
```

Example:

```bash
docker tag ping-pong-game:latest 097670902547.dkr.ecr.ap-south-1.amazonaws.com/ping-pong-game-repo:latest
```

---

#### 7.5 Push the Image to ECR

Authenticate with ECR:

```bash
aws ecr get-login-password --region eu-nort-1 | docker login --username AWS --password-stdin <ECR_URI>
```

Push the image:

```bash
docker push <ECR_URI>:latest
```

---

#### 7.6 Verify the Image in ECR

Go to the **ECR Console** and check if the image appears under your repository (e.g., `ping-pong-game-repo`).

```

---

```
## 7.7 Access the Website through ECS URL

Now that you've pushed your containerized **Ping Pong Game** to Amazon ECR and deployed it via ECS, follow the steps below to access the website:

---

### ✅ Step 1: Verify the ECS Service is Running

1. Go to the [Amazon ECS Console](https://console.aws.amazon.com/ecs/).
2. Navigate to the **Clusters** section.
3. Select your cluster (e.g., `ping-pong-game-cluster`).
4. Click on the **Services** tab.
5. Confirm that your service (e.g., `ping-pong-service`) is in the `RUNNING` status and the desired number of tasks are active.

---

### 🌍 Step 2: Find the Public IP Address of the ECS Task

1. Under your cluster, go to the **Tasks** tab.
2. Click on the running task to open its details.
3. In the **Network** section, locate the **Public IP** assigned to your ECS task.

> 📌 This is the IP address through which your Ping Pong Game will be accessible.

---

### 🔐 Step 3: Modify Security Group to Allow HTTP Traffic

1. In the **Network** section, find the **Security Group ID** associated with the task.
2. Click on the Security Group ID — this will take you to the **EC2 Console**.
3. In the **Inbound Rules** tab, click **Edit inbound rules**.
4. Add the following rule:

   - **Type:** HTTP  
   - **Protocol:** TCP  
   - **Port Range:** 80  
   - **Source:** Anywhere (`0.0.0.0/0`) or a specific IP range if desired

5. Click **Save rules** to apply changes.

---

### 🌐 Step 4: Access the Ping Pong Game Website

- Open your browser and type:

```text
http://<Public-IP>:80
```

- Replace `<Public-IP>` with the actual public IP address you found earlier.

> ✅ You can also directly click on the open address option if provided in the ECS console.

---

### 🕹️ Step 5: Verify the Game’s Functionality

- Ensure the **Ping Pong Game** loads correctly in the browser.
- Interact with the game and verify that the frontend is functioning as expected.

---

🎉 That’s it! Your **Ping Pong Game** is now live and accessible via a public IP using Amazon ECS & ECR.

```


```
## 8. Step-by-Step Guide to Push the Ping Pong Game Code to GitHub with CI/CD

---

### 🆕 8.1 Create a New GitHub Repository

1. Go to [GitHub](https://github.com/) and click **New Repository**.
2. Provide a name like `ping-pong-game-ci-cd`.
3. Optionally, add a description like: `"CI/CD pipeline setup for Ping Pong Game"`.
4. **Do not** initialize with a README or `.gitignore`, as you will push your existing code.
5. Click **Create repository**.

---

### 🛠️ 8.2 Modify `buildspec.yml`

The `buildspec.yml` file is crucial for **AWS CodeBuild**, as it defines the commands to build and push the Docker image to **Amazon ECR**, and prepare it for deployment to **ECS**.

#### ✅ Example `buildspec.yml` (Update the placeholders)

```yaml
version: 0.2

phases:
  pre_build:
    commands:
      - echo Logging in to Amazon ECR...
      - aws ecr get-login-password --region <your-region> | docker login --username AWS --password-stdin <your-ecr-repository-uri>
  build:
    commands:
      - echo Building the Docker image...
      - docker build -t <image-name> .
      - echo Tagging the Docker image...
      - docker tag <image-name>:latest <your-ecr-repository-uri>:latest
  post_build:
    commands:
      - echo Pushing the Docker image to Amazon ECR...
      - docker push <your-ecr-repository-uri>:latest
      - echo Creating imagedefinitions.json file for ECS deployment...
      - echo '[{"name":"<container-name>","imageUri":"<your-ecr-repository-uri>/<repository-name>:latest"}]' > imagedefinitions.json

artifacts:
  files:
    - imagedefinitions.json
```

---

### 🔎 Placeholder Details – What to Replace and Where to Find Them

| Placeholder                | What It Is | How to Find It |
|----------------------------|------------|----------------|
| `<your-region>`            | Your AWS region (like `ap-south-1`) | Found in the top-right corner of AWS Management Console or the URL (e.g., `https://ap-south-1.console.aws.amazon.com/`) |
| `<your-ecr-repository-uri>`| Amazon ECR Repository URI | Go to **Amazon ECR > Repositories**, select your repo (e.g., `pingpong-repo`), and copy the URI shown on the top (e.g., `123456789012.dkr.ecr.ap-south-1.amazonaws.com/pingpong-repo`) |
| `<image-name>`             | Name you want to give your Docker image | This can be any name you choose, like `pingpong-game` |
| `<repository-name>`        | Name of your ECR repository | Same as the one you created in **Amazon ECR**, like `pingpong-repo` |
| `<container-name>`         | ECS Container name | Found in your **ECS Task Definition > Container Definitions > Name** field (e.g., `pingpong-container`) |

---

### 🧠 Explanation of `buildspec.yml` Sections

- **`pre_build`**: Logs into Amazon ECR using AWS CLI to authenticate Docker.
- **`build`**: Builds and tags the Docker image for the Ping Pong Game.
- **`post_build`**: Pushes the Docker image to ECR and generates `imagedefinitions.json`, which ECS uses to pull the latest image.
- **`artifacts`**: Declares the output artifact used for ECS deployment (i.e., `imagedefinitions.json`).

---

### ⬆️ 8.3 Push the Code to GitHub

1. Open a terminal or command prompt in the folder where your Ping Pong Game code and `buildspec.yml` are located.
2. Run the following commands:

```bash
git init
git add .
git commit -m "Initial commit"
git remote remove origin          # Only if origin was already set
git remote add origin <your-repository-url>
git branch -M main
git push -u origin main
```

---

### 💬 Explanation of Git Commands

| Command                          | Description |
|----------------------------------|-------------|
| `git init`                       | Initializes Git in your project folder. |
| `git add .`                      | Stages all files in the directory. |
| `git commit -m "Initial commit"`| Commits all staged files with a message. |
| `git remote add origin <url>`   | Links your local repo to the new GitHub repository. |
| `git push -u origin main`       | Pushes code to the `main` branch on GitHub. |

---

### ✅ 8.4 Verify on GitHub

Visit your GitHub repository in the browser. You should now see:
- Your Ping Pong Game source code
- The `Dockerfile`
- The `buildspec.yml`
- Any other files related to your CI/CD setup

---

🎉 You’ve successfully set up and pushed your Ping Pong Game code to GitHub with a ready-to-go CI/CD pipeline using AWS services!
```

Here's your **complete and cleanly formatted guide** with updated names (replacing **2048** with **Ping Pong Game**), and **no content skipped**, exactly as per your request:

---

```
## 9 Set Up CodeBuild for Continuous Integration (CI) – Ping Pong Game

---

### ✅ STEPS TO BE PERFORMED:

1. Create an IAM Role for CodeBuild  
2. Create an S3 Bucket for Build Artifacts  
3. Create a CodeBuild Project  
4. Test the CodeBuild Project  

---

### 🔐 9.1 Create an IAM Role for CodeBuild

AWS services like CodeBuild need permissions to interact with **ECR**, **ECS**, **S3**, and **CodeBuild** itself.

#### ▶️ Go to the IAM Console:

- Navigate to the [IAM](https://console.aws.amazon.com/iam) section of the AWS console.

#### ▶️ Create a New IAM Role:

- Click **Create Role**  
- Choose **CodeBuild** as the **trusted entity type**

#### ▶️ Attach the Following Managed Policies:

- `AmazonEC2ContainerRegistryFullAccess`: Allows CodeBuild to interact with ECR  
- `AWSCodeBuildDeveloperAccess`: Grants CodeBuild access to build-related services  
- `AmazonS3FullAccess`: Grants read/write access to S3 buckets (for storing build artifacts)

#### ▶️ Name the Role:

- Example: `codeBuildServiceRole`  
- Click **Create Role**

---

####  Attach Inline Policy for ECS

1. Go to the role: `IAM > Roles > codeBuildServiceRole`
2. Click **Add permissions > Create inline policy**
3. Click on the **JSON** tab
4. Paste the following policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ecs:UpdateService",
        "ecs:DescribeServices"
      ],
      "Resource": "<ENTER_YOUR_ECS_SERVICE_ARN>"
    }
  ]
}
```

<aside>📌  
You can get your `<ECS_SERVICE_ARN>` by navigating to:  
**ECS > Clusters > pingpong-game-cluster > Services > pingpong-service**  
</aside>

5. Click **Next**, give a name (e.g., `ECSAccessPolicy`), and **Create Policy**

---

### 🪣 9.2 Create a S3 Bucket for Build Artifacts

CodeBuild generates output files like Docker image metadata and logs. These are stored in an **S3 bucket** for later access.

#### ▶️ Steps:

1. Navigate to the [S3 Console](https://s3.console.aws.amazon.com/s3/)
2. Click **Create Bucket**
3. Name it something like: `pingpong-ci-cd-pipeline-artifacts`  
   (📌 Bucket name must be globally unique)
4. Keep the rest of the settings default  
5. Click **Create Bucket**

---

### 🔧 9.3 Create a CodeBuild Project

The CodeBuild project pulls your GitHub repo, builds the Docker image, and stores results in S3.

#### ▶️ Go to CodeBuild Console:

- Navigate to [CodeBuild Console](https://console.aws.amazon.com/codebuild/home)  
- Click **Create Build Project**

#### ▶️ Configure the Project:

- **Project Name**: `pingpong-game-build`
- **Source Provider**: Choose **GitHub**
- Click on **Manage default source credential**
  - Use **OAuth App** for Credential type
  - Use **CodeBuild** as service
- Select the GitHub repository created earlier

#### ▶️ Environment Settings:

- Keep other environment configs default
- **Service Role**: Choose **Existing Role** and select `codeBuildServiceRole` created earlier

#### ▶️ Buildspec Configuration:

- Select **Use a buildspec file**

#### ▶️ Artifacts Configuration:

- **Type**: Amazon S3
- **Bucket**: Choose `pingpong-ci-cd-pipeline-artifacts`
- Leave all other settings default

#### ▶️ Create the Build Project:

- Review all the settings  
- Click **Create Build Project**

---

### 🧪 9.4 Test the CodeBuild Project

#### ▶️ Start a Build:

- In CodeBuild console, select the project (`pingpong-game-build`)
- Click **Start Build** to trigger manually

#### ▶️ Verify Build Success:

- Monitor **Build Logs** to ensure:
  - Docker image is built
  - Image is pushed to **ECR**
- Check the **S3 bucket** to ensure:
  - `imagedefinitions.json` file is generated and uploaded successfully

---

🎉 You’ve now successfully set up **CodeBuild for CI** with your **Ping Pong Game** project!
```

Here is your fully preserved and cleanly formatted version of **"Set up CodePipeline for Continuous Deployment"** – adapted for **Ping Pong Game**, and with **no content skipped**:

---

```
## 🚀 10. Set Up CodePipeline for Continuous Deployment – Ping Pong Game

---

### ✅ STEPS TO BE PERFORMED:

1. Create an AWS CodePipeline  
2. Test the Pipeline  

---

### 🏗️ 10.1 Create an AWS CodePipeline

AWS CodePipeline connects different stages of your CI/CD process. We’ll define how updates in your GitHub repo will trigger builds and deployments to ECS.

---

#### ▶️ Step 1: Navigate to CodePipeline Console

- Go to [AWS Management Console](https://console.aws.amazon.com/)  
- Search for **CodePipeline** in the search bar  
- Click to open the **CodePipeline Console**

---

#### ▶️ Step 2: Create a New Pipeline

- Click **Create pipeline**  
- Choose **Build your own pipeline**  
- Click **Next**

##### 🔧 Pipeline Configuration:

- **Pipeline name**: `pingpong-game-pipeline`  
- **Service Role**: Select **Create a new service role**  
- **Role name**: `codePipelineServiceRole`  
- Click **Next**

---

#### ▶️ Step 3: Add Source Stage (GitHub)

This step tells CodePipeline where to pull the latest source code.

##### 🔧 Source Configuration:

- **Source Provider**: GitHub (via OAuth App)  
- Click **Connect to GitHub**  
  - Authorize AWS to access your GitHub account (if not already done)  
- **Repository**: Select your GitHub repo for Ping Pong Game  
- **Branch**: Select `main`  
- Click **Next**

---

#### ▶️ Step 4: Add Build Stage (CodeBuild)

CodeBuild will build and test the application.

##### 🔧 Build Configuration:

- **Build Provider**: AWS CodeBuild  
- **Project Name**: Select the project you created earlier (e.g., `pingpong-game-build`)  
- Leave other options as default  
- Click **Next**
- Skip test stage 

---

#### ▶️ Step 5: Add Deploy Stage (ECS Deployment)

Once built, the app is deployed to Amazon ECS automatically.

##### 🔧 Deploy Configuration:

- **Deploy Provider**: Amazon ECS  
- **Cluster**: Select your ECS Cluster (e.g., `pingpong-game-cluster`)  
- **Service**: Select your ECS Service (e.g., `pingpong-service`)  
- Leave the rest as default  
- Click **Next**

---

#### ▶️ Step 6: Review and Create Pipeline

- **Review all stages**: Source → Build → Deploy  
- If everything looks correct, click **Create pipeline**

📌 The pipeline will immediately begin running and execute each stage.

---

### 🧪 10.2 Test the Pipeline

Now let's test if the CI/CD pipeline works end-to-end.

---

#### ▶️ Step 1: Modify the Website Code

Update the game title in the frontend.

- Open `index.html`  
- Find the line(23) with:  <div class="game-title">Ping Pong</div>
- replace game name "Ping Pong" with your name "XYZ"
- save changes
 

---

#### ▶️ Step 2: Commit and Push the Change

Run the following commands in your terminal:

```bash
git add .
git commit -m "Changed game name to Ping Pong by YourName"
git push -u origin main
```

📌 Make sure you're on the `main` branch.

---

#### ▶️ Step 3: Monitor the Pipeline Execution

- Go to the **CodePipeline Console**
- Your pipeline (`pingpong-game-pipeline`) should automatically trigger
- Stages will run as follows:
  - **Source**: Pulls code from GitHub
  - **Build**: Runs `buildspec.yml`, builds image, pushes to ECR
  - **Deploy**: Deploys the latest image to ECS

📋 Monitor logs for each stage. If errors occur, check logs for more details.

---

#### ▶️ Step 4: Verify the Deployment

- Go to **ECS > Clusters > pingpong-game-cluster > Tasks tab**
- Click the latest **Task**
- Go to **Networking tab** and copy the **Public IP Address**
- Open your browser and go to:

```
http://<public_ip>:80
```
---

🎉 Congratulations! You've successfully set up a complete CI/CD pipeline for your **Ping Pong Game** using **AWS CodePipeline, ECS, ECR, S3, and CodeBuild**!


