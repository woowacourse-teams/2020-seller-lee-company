node {
    stage ('clone') {
        checkout scm
    }
    stage('build') {
        sh 'cd back/api && ./gradlew clean build'
    }
}
