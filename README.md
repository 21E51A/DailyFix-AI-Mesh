/// BACKEND ////

for backend run the ansible book --> DailyFix-AI-Mesh/infra/ansile/ansible-playbook playbooks/bastion.yml
run this command to start docker -->systemctl start docker
run this command to configure AWS --> aws configure -->give the access key ID, secret key ID, give region where your project is running,and  Default output format [None]: json
after configuring AWS --> run this command for eks cluster -->   aws eks update-kubeconfig --region ap-south-1 --name dailyfix-eks
after run this command ---> kubectl get nodes

after ansible go to backend --> DailyFix-AI-Mesh/backend/ run this command --> docker build -t backend .
after run this command --> docker images

/// frontend ///

simarlly after creating backend docker image go to frontend --> DailyFix-AI-Mesh/frontend run this command --> docker build -t frontend .
after run this command --> docker images

after creatig docker images push this docker images into ECR  

to run docker images inside the kubernetes run this commands
kubectl apply -f infra/kubernetes/backend/secret.yaml -n dailyfix
kubectl apply -f infra/kubernetes/backend/deployment.yaml -n dailyfix
kubectl apply -f infra/kubernetes/backend/service.yaml -n dailyfix

to delete pods inisde the kubernetes 
kubectl delete pods -n dailyfix -l app=backend --->backend
kubectl scale deployment backend --replicas=0 -n dailyfix --> delete replica 


inside the new_server  cd ~/matrix/synapse