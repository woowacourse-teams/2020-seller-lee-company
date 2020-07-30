node {
    stage ('clone') {
        checkout scm
    }
    stage('build') {
        sh 'ls'
        sh './back/gradlew clean build'
    }
}
