Docker:

Local Development:

Build Docker Image:

# Build Docker image
$ docker build -t {name-of-image} .

Example:
# Build Docker image
$ docker build -t Nikhil117/projectzed:0.0.1 .

Run Docker Container:

# Run Docker container from image
$ docker run --name {name-of-container} -d -p {port}:{port} --env-file .env {name-of-image}

Example:
# Run Docker container from image
$ docker run --name ZedContainer -d -p 8080:8080 --env-file .env Nikhil117/projectzed:0.0.1


Cloud Deployment (Google Cloud Run):

Build Docker Image:

# Build Docker image
$ docker build -t gcr.io/{project-id}/{name-of-image}:{tag} .

Example:
# Build Docker image
$ docker build -t gcr.io/my-project/my-node-app:latest .


Deploy to Google Cloud Run:

# Deploy Docker image to Google Cloud Run
$ gcloud run deploy --image gcr.io/{project-id}/{name-of-image}:{tag} --platform managed

Example:

# Deploy Docker image to Google Cloud Run
$ gcloud run deploy --image gcr.io/my-project/my-node-app:latest --platform managed


Run Docker Container on Google Cloud Run with Environment Variables:

# Deploy Docker image to Google Cloud Run with environment variables
$ gcloud run deploy --image gcr.io/{project-id}/{name-of-image}:{tag} --platform managed --set-env-vars VAR1=value1,VAR2=value2

Example:

# Deploy Docker image to Google Cloud Run with environment variables
$ gcloud run deploy --image gcr.io/my-project/my-node-app:latest --platform managed --set-env-vars DB_HOST=localhost,DB_USER=admin,DB_PASS=password







[text](https://fonts.google.com/icons)

# Tagging docker image for gcp upload
docker tag Nikhil117/projectzed:0.0.1 gcr.io/esportshub-a6b1f/projectzed 