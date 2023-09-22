
pipeline {
    agent any

    tools {
        // Define Node.js tool configuration
        nodejs "mernstack"
    }

    environment {
        MONGODB_URI = credentials('mongodb-uri')
        TOKEN_KEY = credentials('token-key')
        EMAIL = credentials('email')
        PASSWORD = credentials('password')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Client Tests') {
            steps {
                sh 'npm install'
                sh 'pm2 start index.js'
                sh 'pm2 status'
                sh 'pm2 restart all'
                sh 'export MONGODB_URI=$MONGODB_URI TOKEN_KEY=$TOKEN_KEY EMAIL=$EMAIL PASSWORD=$PASSWORD'
            }
        }

        stage('Build Images') {
            steps {
                sh 'sudo docker build -t mern-app:latest /var/lib/jenkins/workspace/nuraltech'
            }
        }

        stage('Push Images to DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                    sh 'sudo docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD'
                    sh 'sudo docker tag mern-app:latest escale1234/mern-app:latest'
                    sh 'sudo docker push escale1234/mern-app:latest'
                }
            }
        }
    }
}
