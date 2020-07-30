node {
    stage ('clone') {
        checkout scm
    }
    stage('build') {
        sh 'cd back'
        sh './gradlew clean build'
    }
}