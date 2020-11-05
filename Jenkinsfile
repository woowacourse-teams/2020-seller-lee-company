node {
    stage ('clone') {
        checkout scm
    }
    stage('build') {
        sh 'cd back && ./gradlew api:clean api:build && ./gradlew chat:clean chat:build'
    }
    stage('SonarQube analysis') {
      withSonarQubeEnv('SonarQube') {
        sh 'cd back && ./gradlew --info sonarqube ' +
        '-Dsonar.projectKey=Jikgorae-$GIT_BRANCH ' +
        '-Dsonar.projectName=Jikgorae-$GIT_BRANCH '
      }
    }
}
