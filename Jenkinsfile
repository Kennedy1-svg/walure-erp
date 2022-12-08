pipeline {

  environment {
    dockerimagename = "smartware123/nodeapp2"
    dockerImage = ""
  }

    agent any

    stages {

        stage('Build image') {
            steps{
                script {
                    dockerImage = docker.build dockerimagename
                }
            }
        }

        stage('Pushing Image') {
            environment {
                registryCredential = 'dockerhublogin'
            }
            steps{
                script {
                    docker.withRegistry( 'https://registry.hub.docker.com/', registryCredential ) {
                        dockerImage.push("latest")
                    }
                }
            }
        }
    }
}