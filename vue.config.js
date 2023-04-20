const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  outputDir: "../src/main/resources/static",
  transpileDependencies: true,
  devServer :{
    //벡엔드 서버 위치 : 프론트에서 '/api로 시작하면 http://127.0.0.1:3000를 호출
    proxy : {
      '/api' : {
        target : 'http://localhost:8088',
        changeOrigin : true,
        logLevel:'debug'
      },
      "/oauth2.0" : {
        target : 'https://nid.naver.com/',
        changeOrigin : true,
        logLevel : 'debug'
      },
      "/v1" : {
        target : 'https://openapi.naver.com/',
        changeOrigin : true,
        logLevel : 'debug'
      },
    }
  }
})