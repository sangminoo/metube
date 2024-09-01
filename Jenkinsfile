pipeline {
    agent any

    tools {
        nodejs "nodejs"
    }
    
    stages {
        stage('Checkout') {
            steps {
                // Lấy mã nguồn từ repository
                git url: 'https://github.com/sangminoo/metube', branch: 'main'
            }
        }
        
        stage('Build') {
            steps {
                // Chạy các lệnh build, ví dụ như lệnh Maven cho dự án Java hoặc npm cho dự án Node.js
                script {
                    // sh 'echo "Building the project..."'
                    // Ví dụ: sh 'mvn clean package'
                    // Hoặc: 
                    sh 'npm install &&  npm run build'
                }
            }
        }

        // stage('Test') {
        //     steps {
        //         // Chạy các lệnh kiểm thử tự động
        //         script {
        //             sh 'echo "Running tests..."'
        //             // Ví dụ: sh 'mvn test'
        //             // Hoặc: sh 'npm test'
        //         }
        //     }
        // }

        // stage('Deploy') {
        //     steps {
        //         // Deploy ứng dụng, ví dụ như chuyển build artifact lên môi trường staging hoặc production
        //         script {
        //             sh 'echo "Deploying the project..."'
        //             // Ví dụ: sh 'scp target/*.jar user@server:/path/to/deploy'
        //         }
        //     }
        // }
    }

    post {
        // always {
        //     // Thực hiện các hành động luôn luôn được thực hiện, chẳng hạn như dọn dẹp hoặc gửi thông báo
        //     echo 'Cleaning up...'
        //     deleteDir()
        // }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
