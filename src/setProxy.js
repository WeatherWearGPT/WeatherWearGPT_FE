const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://43.202.86.72/',	//서버 URL or localhost:설정한포트번호
      changeOrigin: true,
    })
  );
};