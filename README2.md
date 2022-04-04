# Problem Statement: Automate the deployment of Node.js application using Kubernetes with Helm Chart with own Dockerfiles for application. (No Docker compose).

# Steps carried out so far

# Step 1. Docker Image creation and GIT repository cloning

1. Provision an EC2 instance in AWS and connect to it using the SSH client.
2. Type sudo -i to change the permission to root user
3. Update the software repositories using sudo apt-get update -y
4. Install docker with the following command sudo apt install docker.io
5. Start and enable docker with the following command sudo systemctl start docker & then
   sudo systemctl enable docker
6. To confirm if docker is running use the following command sudo systemctl status docker. You should see the active (running) in green then press the letter q to exit
7. Use the id command to identify the user id of the user that will run the container
8. The user in our case is the root user, use the following command to add the root user to the docker group sudo usermod -aG docker root
9. Check docker version by running the following command docker --version
10. Clone the GIT repository by running the following command git clone https://github.com/AUS-Candidate-Rep/ibrahim_devops.git
11. Type ls command to list all repository and then use cd ibrahim_devops/hello_world to change the directory to hello_world
12. Type the following command to create the docker image, docker build . -t iberoje/newnodeapp.
    iberoje is my repository name in dockerhub while newnodeapp is the name of the image.
13. To check if the image is created, type docker images

14. Login to dockerhub from the command line using the following command docker login, you be be prompted for you username and password.

15. Use the following command to push the image to you dockerhub repository  
    docker push iberoje/newnodeapp:latest

16. Login to dockerhub from your browser to confirm that the image was created.

# Step 2. Create Terraform EC2 instance

1. Create an EC2 instance in AWS

2. After establishing connection with the EC2 instance, you need to use the sudo -i to grant permission as a root user and then use the following command to create a working directory sudo mkdir -p /opt/terraform and change directory to /opt/terraform

3. Download Terraform from Hasicorp website using the following command
   sudo wget https://releases.hashicorp.com/terraform/1.1.7/terraform_1.1.7_linux_386.zip

4. Install unzip utility
   sudo apt-get install unzip -y

5. Unzip Terraform Zip file
   sudo unzip terraform_1.1.7_linux_386.zip

6. Add terraform to PATH
   sudo mv /opt/terraform/terraform /usr/bin/

7. Verify Terraform version by typing the following command
   terraform -version

8. Install AWS CLI using APT package manager  
   8a. First update the package repository cache with the following command
   sudo apt-get update
   8b. Now install AWS CLI with the following command  
    sudo apt-get install awscli
   8c. Now check whether AWS CLI is working with the following command
   aws --version

9. Log in to your AWS console and go to the IAM service section.

10. Under IAM Dashboard, click on Users from left hand side navigation panel

11. Now Click on Add user

12. Provide the user name, select the Access type then click on Next

13. Click on Create group as we want our user to belong to a particular group

14. Provide Group name and select group policy. For this project, I am using Administrator access then click on Create Group

15. Now your Group is added click on Next button

16. Review the provided details and Click on Create User

17. Now you must get a success message saying user added successfully

18. Now download the CSV file. This file contains user details like Access key id, Secret key

19. Refer back to step 8, after checking the version of aws, you should type the following command
    aws configure
    19a. Provide AWS Access Key ID from the downloaded CSV file
    19b. Provide AWS secret access key from the downloaded CSV file.
    19c. Provide us-west-1 as Default region name. note my default region was us-west-1
    19d. Select json as Default output format.

# Set up cluster using Terraform

1. Create provider.tf file to specify aws terraform provider

2. Create a new file named eks-cluster.tf. In this file we will add the code to create all the required Policies, Master node and worker nodes

3. Create a outputs.tf file to show us the required output after the cluster is created

# Running the Terraform file

4. For that open the command prompt and go to the folder in which you have the above code file and run the below command. It will install all the required plugins needed
   terraform init

5.Run the following command. This will do the dry run and tells what all resources it will going to build, without actually building them
terraform plan

6. Run the below command it will build all the infrastructure required
   terraform apply

# Check if the cluster have been created successfully

1. Login to aws portal

2. Search for EKS from the search bar

3. Look for eks-cluster-demo cluster that was created

4. To check the worker node, click on the cluster > configuration > compute. Note, only one worker was created.

# Steps to instal Kubectl

Note: The kubectl command line tool lets you control Kubernetes clusters

1. Check the Cluster Name & Region Name where EKS Master node is running from console in AWS, in my case, it is us-west-1

2. Check status of Cluster from the command line using the following command
   aws eks --region us-west-1 describe-cluster --name eks_cluster_demo --query cluster.status

3. Configure kubectl with EKS API Server credential using the following command
   aws eks --region us-west-1 update-kubeconfig --name eks_cluster_demo

4. Validate kubectl configuration to master node by using the following command
   kubectl get svc

4a. Verify Worker node status from Kubectl by running the following command
kubectl get nodes --watch

Note, to delete the cluster using terraform use the following command
terraform destroy

# Step 3. Helm chart installation

1. Create helm chart on the master node by using the following command
   helm create mychart

2. Verify the YAML files generated after running the helm create command using the following command
   tree mychart

3. When the Helm Chart was generated, by default deployment.yaml is prefilled/pre-populated with some configs, so we need to only update the container port, in this case, our container port is 3000

4. The last YAMLs which is left for conversion is values.yaml and here we need to update the repository and the port. The repository in ourcase is iberoje/newnodeapp and the port is 8080

5. Verify the Conversion of YAMLs by using the following command
   helm template mychart

6. Use the lint command which will tell you if there are any syntactical errors in the YAMls
   helm lint mychart

7. Run the following helm command to install the chart
   helm install k8sToHelmChart mychart

8. Lastly, connect to your application by using the generated ip address:port

# Scalability

To scale the number of pods, we used the following command

1. kubectl get deployment, this will list the deployments and get the deployment name

2. After getting the deployment name, we can scale the number of pods by using the following command
   kubectl scale --replicas=3 deployment [deployment name]
