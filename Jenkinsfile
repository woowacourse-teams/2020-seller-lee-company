node {
    stage ('clone') {
        checkout scm
    }
    stage('build') {
        sh 'cd back && ./gradlew api:clean api:build && ./gradlew chat:clean chat:build'
    }
    stage('SonarQube analysis') {
      environment {
        SCANNER_HOME = tool 'SonarQube scanner'
      }
      withSonarQubeEnv('SonarQube') {
        sh './gradlew --info sonarqube'
      }
    }
}
